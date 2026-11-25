import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  checkCredentials,
  createSessionToken,
  formatLogin,
  hashPassword,
  isUserId,
  parseLogin,
  readSessionToken,
  sessionKey,
  verifyPassword,
} from '../../server/deepwork/auth.js';

const PASSWORD = 'correct horse battery staple';

test('a hashed password verifies and never contains the password', async () => {
  const hash = await hashPassword(PASSWORD);

  assert.equal(await verifyPassword(PASSWORD, hash), true);
  assert.equal(hash.includes(PASSWORD), false);
  assert.match(hash, /^scrypt\.\d+\.\d+\.\d+\.[\w-]+\.[\w-]+$/);
});

test('two hashes of the same password differ because each has its own salt', async () => {
  const first = await hashPassword(PASSWORD);
  const second = await hashPassword(PASSWORD);

  assert.notEqual(first, second);
});

test('a wrong password does not verify', async () => {
  const hash = await hashPassword(PASSWORD);

  assert.equal(await verifyPassword('wrong password', hash), false);
});

test('a malformed stored hash never verifies', async () => {
  for (const stored of ['', 'plain', 'scrypt.15.8.1.onlysalt', 'bcrypt.1.2.3.a.b', 'scrypt.99.8.1.YQ.YQ', null]) {
    assert.equal(await verifyPassword(PASSWORD, stored), false, String(stored));
  }
});

test('user IDs are short lowercase names', () => {
  assert.equal(isUserId('harsha'), true);
  assert.equal(isUserId('h'), false);
  assert.equal(isUserId('Harsha'), false);
  assert.equal(isUserId('har:sha'), false);
  assert.equal(isUserId(42), false);
});

test('a login setting round-trips through format and parse', async () => {
  const hash = await hashPassword(PASSWORD);

  const login = parseLogin(formatLogin('harsha', hash));

  assert.deepEqual(login, { userId: 'harsha', passwordHash: hash });
});

test('a missing or broken login setting parses to null', () => {
  for (const value of [undefined, '', 'harsha', ':scrypt.15.8.1.a.b', 'BAD ID:scrypt.15.8.1.a.b', 'harsha:notahash']) {
    assert.equal(parseLogin(value), null, String(value));
  }
});

test('credentials pass only when both the user ID and the password match', async () => {
  const login = parseLogin(formatLogin('harsha', await hashPassword(PASSWORD)));

  assert.equal(await checkCredentials(login, 'harsha', PASSWORD), true);
  assert.equal(await checkCredentials(login, ' Harsha ', PASSWORD), true, 'user ID ignores case and spaces');
  assert.equal(await checkCredentials(login, 'someone', PASSWORD), false);
  assert.equal(await checkCredentials(login, 'harsha', 'nope'), false);
  assert.equal(await checkCredentials(login, 'harsha', undefined), false);
  assert.equal(await checkCredentials(login, { $ne: null }, PASSWORD), false);
  assert.equal(await checkCredentials(login, 'harsha', 'x'.repeat(5000)), false);
});

test('a session token reads back the user it was made for', async () => {
  const login = parseLogin(formatLogin('harsha', await hashPassword(PASSWORD)));
  const key = sessionKey(login);

  const token = createSessionToken('harsha', key, 1000, 60);

  assert.equal(readSessionToken(token, key, 1030), 'harsha');
});

test('an expired, tampered or foreign session token is rejected', async () => {
  const login = parseLogin(formatLogin('harsha', await hashPassword(PASSWORD)));
  const other = parseLogin(formatLogin('harsha', await hashPassword('another password')));
  const key = sessionKey(login);
  const token = createSessionToken('harsha', key, 1000, 60);
  const parts = token.split('.');
  const longerLife = [parts[0], parts[1], '9999999999', parts[3]].join('.');

  assert.equal(readSessionToken(token, key, 1060), null, 'expired');
  assert.equal(readSessionToken(longerLife, key, 1030), null, 'expiry edited');
  assert.equal(readSessionToken(token, sessionKey(other), 1030), null, 'signed with another key');
  assert.equal(readSessionToken('garbage', key, 1030), null);
  assert.equal(readSessionToken(undefined, key, 1030), null);
  assert.equal(readSessionToken('x'.repeat(4000), key, 1030), null);
});

test('changing the password changes the session key, which signs everyone out', async () => {
  const before = sessionKey(parseLogin(formatLogin('harsha', await hashPassword(PASSWORD))));
  const after = sessionKey(parseLogin(formatLogin('harsha', await hashPassword('new password'))));

  assert.equal(before.equals(after), false);
});
