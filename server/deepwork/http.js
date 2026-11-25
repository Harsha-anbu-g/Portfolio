import { Buffer } from 'node:buffer';
import { API_PATH, SESSION_COOKIE } from './config.js';

const IPV6_GROUPS = 8;
const NETWORK_GROUPS = 4;
const IPV4_IN_IPV6 = /^::ffff:(\d+\.\d+\.\d+\.\d+)$/i;

function json(status, body, headers = {}) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store', ...headers },
  });
}

/** A successful reply in the shared `{ ok, data, error }` envelope. */
export const ok = (data, headers) => json(200, { ok: true, data, error: null }, headers);

/** A failed reply in the same envelope, with a short code and a message safe to show. */
export const fail = (status, code, message, headers) => json(status, { ok: false, data: null, error: { code, message } }, headers);

const hostOf = (request) => request.headers.get('host') || new URL(request.url).host;

/** True when a change was sent by this site's own page, never by another website. */
export function isSameOrigin(request) {
  const origin = request.headers.get('origin');
  if (!origin) return false;
  try {
    return new URL(origin).host === hostOf(request);
  } catch {
    return false;
  }
}

/** The caller's address, as reported by the hosting platform. */
export function clientAddress(request) {
  const forwarded = (request.headers.get('x-forwarded-for') || '').split(',')[0].trim();
  return request.headers.get('x-real-ip') || forwarded || 'unknown';
}

/**
 * The key sign-in tries are counted under. An IPv4 address counts on its own. An IPv6 address
 * counts by its /64 network, because one connection can hand out many addresses inside it.
 * @param {string} address
 * @returns {string}
 */
export function throttleKey(address) {
  const wrapped = IPV4_IN_IPV6.exec(address);
  if (wrapped) return wrapped[1];
  if (!address.includes(':')) return address;
  const [head, tail] = address.split('::');
  const headGroups = head ? head.split(':') : [];
  const tailGroups = tail ? tail.split(':') : [];
  const gap = address.includes('::') ? Math.max(IPV6_GROUPS - headGroups.length - tailGroups.length, 0) : 0;
  const groups = [...headGroups, ...Array(gap).fill('0'), ...tailGroups];
  const network = groups.slice(0, NETWORK_GROUPS).map((group) => group.toLowerCase().replace(/^0+(?=.)/, ''));
  return `${network.join(':')}::/64`;
}

/** Read one cookie from the request, or '' when it is absent. */
export function readCookie(request, name) {
  const header = request.headers.get('cookie') || '';
  for (const part of header.split(';')) {
    const split = part.indexOf('=');
    if (split > 0 && part.slice(0, split).trim() === name) return part.slice(split + 1).trim();
  }
  return '';
}

const cookieFlags = (maxAgeSeconds, isSecure) => `Path=${API_PATH}; HttpOnly; SameSite=Strict; Max-Age=${maxAgeSeconds}${isSecure ? '; Secure' : ''}`;

/** The Set-Cookie value that starts a session. JavaScript on the page can never read it. */
export const sessionCookie = (token, maxAgeSeconds, isSecure) => `${SESSION_COOKIE}=${token}; ${cookieFlags(maxAgeSeconds, isSecure)}`;

/** The Set-Cookie value that ends a session. */
export const expiredCookie = (isSecure) => `${SESSION_COOKIE}=; ${cookieFlags(0, isSecure)}`;

async function readLimitedText(request, maxBytes) {
  if (Number(request.headers.get('content-length')) > maxBytes) return null;
  if (!request.body) return '';
  const chunks = [];
  let total = 0;
  for await (const chunk of request.body) {
    total += chunk.byteLength;
    if (total > maxBytes) return null;
    chunks.push(chunk);
  }
  return Buffer.concat(chunks).toString('utf8');
}

/**
 * Read a small JSON object from the request body.
 * @returns {Promise<{ ok: true, value: object } | { ok: false, response: Response }>}
 */
export async function readJsonBody(request, maxBytes) {
  const text = await readLimitedText(request, maxBytes);
  if (text === null) return { ok: false, response: fail(413, 'too_large', 'That is too much to save at once.') };
  try {
    const value = JSON.parse(text);
    if (value !== null && typeof value === 'object' && !Array.isArray(value)) return { ok: true, value };
  } catch {
    /* handled by the reply below */
  }
  return { ok: false, response: fail(400, 'bad_request', 'That request could not be read.') };
}
