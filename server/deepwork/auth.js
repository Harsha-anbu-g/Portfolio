import { Buffer } from 'node:buffer';
import { createHash, createHmac, randomBytes, scrypt, timingSafeEqual } from 'node:crypto';
import { promisify } from 'node:util';
import { MAX_PASSWORD_LENGTH } from './config.js';

const scryptAsync = promisify(scrypt);

const SCRYPT_LOG2_N = 15;
const SCRYPT_R = 8;
const SCRYPT_P = 1;
const SCRYPT_MAX_MEMORY_BYTES = 256 * 1024 * 1024;
const MIN_LOG2_N = 14;
const MAX_LOG2_N = 18;
const KEY_BYTES = 32;
const SALT_BYTES = 16;
const MAX_TOKEN_LENGTH = 512;
const USER_ID_PATTERN = /^[a-z0-9][a-z0-9_-]{2,31}$/;
const HASH_PATTERN = /^scrypt\.(\d{1,2})\.(\d{1,2})\.(\d{1,2})\.([\w-]{16,})\.([\w-]{32,})$/;
const SESSION_KEY_LABEL = 'deepwork-session-v1';
const TOKEN_VERSION = 'v1';

/** Compare two strings without leaking, through timing, where they differ. */
function safeEqual(a, b) {
  const left = createHash('sha256').update(String(a)).digest();
  const right = createHash('sha256').update(String(b)).digest();
  return timingSafeEqual(left, right);
}

function derive(password, salt, log2N, r, p) {
  const options = { N: 2 ** log2N, r, p, maxmem: SCRYPT_MAX_MEMORY_BYTES };
  return scryptAsync(password.normalize('NFKC'), salt, KEY_BYTES, options);
}

function parseHash(stored) {
  const match = typeof stored === 'string' ? HASH_PATTERN.exec(stored) : null;
  if (!match) return null;
  const [log2N, r, p] = [Number(match[1]), Number(match[2]), Number(match[3])];
  if (log2N < MIN_LOG2_N || log2N > MAX_LOG2_N || r !== SCRYPT_R || p < 1 || p > 4) return null;
  return { log2N, r, p, salt: Buffer.from(match[4], 'base64url'), hash: Buffer.from(match[5], 'base64url') };
}

/**
 * Turn a password into a salted scrypt hash that is safe to store.
 * @param {string} password
 * @returns {Promise<string>} `scrypt.<log2N>.<r>.<p>.<salt>.<hash>`
 */
export async function hashPassword(password) {
  const salt = randomBytes(SALT_BYTES);
  const hash = await derive(password, salt, SCRYPT_LOG2_N, SCRYPT_R, SCRYPT_P);
  return ['scrypt', SCRYPT_LOG2_N, SCRYPT_R, SCRYPT_P, salt.toString('base64url'), hash.toString('base64url')].join('.');
}

/**
 * Check a typed password against a stored hash.
 * @param {unknown} password
 * @param {unknown} stored
 * @returns {Promise<boolean>}
 */
export async function verifyPassword(password, stored) {
  const parsed = parseHash(stored);
  if (!parsed || typeof password !== 'string' || password.length > MAX_PASSWORD_LENGTH) return false;
  const candidate = await derive(password, parsed.salt, parsed.log2N, parsed.r, parsed.p);
  return candidate.length === parsed.hash.length && timingSafeEqual(candidate, parsed.hash);
}

/** @param {unknown} value @returns {boolean} */
export const isUserId = (value) => typeof value === 'string' && USER_ID_PATTERN.test(value);

/** Build the single hosting setting that holds the user ID and password hash. */
export const formatLogin = (userId, passwordHash) => `${userId}:${passwordHash}`;

/**
 * Read the login setting. Returns null when it is missing or malformed.
 * @param {unknown} value
 * @returns {{ userId: string, passwordHash: string } | null}
 */
export function parseLogin(value) {
  if (typeof value !== 'string') return null;
  const split = value.indexOf(':');
  if (split < 0) return null;
  const userId = value.slice(0, split);
  const passwordHash = value.slice(split + 1);
  return isUserId(userId) && parseHash(passwordHash) ? { userId, passwordHash } : null;
}

/**
 * True only when both the user ID and the password match the stored login.
 * The password is always checked first so a wrong user ID takes just as long.
 */
export async function checkCredentials(login, userId, password) {
  const passwordOk = await verifyPassword(password, login.passwordHash);
  const typedId = typeof userId === 'string' ? userId.trim().toLowerCase() : '';
  return safeEqual(typedId, login.userId) && passwordOk;
}

/** The key that signs session cookies. It changes whenever the password changes. */
export function sessionKey(login) {
  return createHmac('sha256', login.passwordHash).update(SESSION_KEY_LABEL).digest();
}

const sign = (payload, key) => createHmac('sha256', key).update(payload).digest('base64url');

/** Make a signed session token that names the user and when it expires. */
export function createSessionToken(userId, key, nowSeconds, ttlSeconds) {
  const payload = [TOKEN_VERSION, Buffer.from(userId).toString('base64url'), nowSeconds + ttlSeconds].join('.');
  return `${payload}.${sign(payload, key)}`;
}

/**
 * Read a session token. Returns the user ID, or null if it is forged, edited or expired.
 * @returns {string | null}
 */
export function readSessionToken(token, key, nowSeconds) {
  if (typeof token !== 'string' || token.length > MAX_TOKEN_LENGTH) return null;
  const parts = token.split('.');
  if (parts.length !== 4 || parts[0] !== TOKEN_VERSION) return null;
  if (!safeEqual(sign(parts.slice(0, 3).join('.'), key), parts[3])) return null;
  const expiresAt = Number(parts[2]);
  if (!Number.isInteger(expiresAt) || expiresAt <= nowSeconds) return null;
  return Buffer.from(parts[1], 'base64url').toString('utf8');
}
