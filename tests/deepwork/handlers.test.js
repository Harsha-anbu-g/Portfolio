import { after, before, beforeEach, test } from 'node:test';
import assert from 'node:assert/strict';
import { PGlite } from '@electric-sql/pglite';
import { formatLogin, hashPassword, parseLogin } from '../../server/deepwork/auth.js';
import { createHandlers } from '../../server/deepwork/handlers.js';
import { createRepository } from '../../server/deepwork/repository.js';

const SITE = 'https://example.test';
const PASSWORD = 'open-sesame-for-tests';
const TASK = { title: 'Write the report', deadline: '', repeat: false, done: false, doneAt: 0, lastDone: '', createdAt: 1 };
const BLOCK = { taskId: 't1', date: '2026-11-25', hour: 9, done: false, createdAt: 2 };
const quiet = { error() {} };

let db;
let login;
let handlers;
let clock;

before(async () => {
  db = new PGlite();
  login = parseLogin(formatLogin('harsha', await hashPassword(PASSWORD)));
});

beforeEach(async () => {
  clock = 1_800_000_000_000;
  const repo = createRepository(db);
  handlers = createHandlers({ repo, login, now: () => clock, logger: quiet });
  await repo.countDocs('nobody', 'tasks'); // first use creates the tables
  await db.query('TRUNCATE deepwork_docs, deepwork_sign_in_attempts, deepwork_login');
});

after(async () => {
  await db.close();
});

function call(name, method, { path = '', body, cookie, origin = SITE, ip = '203.0.113.7', raw, use = handlers } = {}) {
  const headers = { host: 'example.test', 'x-real-ip': ip };
  if (origin) headers.origin = origin;
  if (cookie) headers.cookie = cookie;
  const init = { method, headers };
  if (body !== undefined || raw !== undefined) {
    headers['content-type'] = 'application/json';
    init.body = raw !== undefined ? raw : JSON.stringify(body);
  }
  return use[name](new Request(`${SITE}/api/deepwork/${name}${path}`, init));
}

async function signIn(options = {}) {
  const response = await call('session', 'POST', { body: { userId: 'harsha', password: PASSWORD }, ...options });
  const setCookie = response.headers.get('set-cookie') || '';
  return { response, setCookie, cookie: setCookie.split(';')[0] };
}

test('a visitor who is not signed in is told so', async () => {
  const response = await call('session', 'GET');

  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { ok: true, data: { signedIn: false, userId: null }, error: null });
  assert.equal(response.headers.get('cache-control'), 'no-store');
});

test('the right user ID and password sign in and set a locked-down cookie', async () => {
  const { response, setCookie } = await signIn();

  assert.equal(response.status, 200);
  assert.deepEqual((await response.json()).data, { signedIn: true, userId: 'harsha' });
  assert.match(setCookie, /^dw_session=v1\./);
  assert.match(setCookie, /HttpOnly/);
  assert.match(setCookie, /SameSite=Strict/);
  assert.match(setCookie, /Secure/);
  assert.match(setCookie, /Path=\/api\/deepwork/);
  assert.match(setCookie, /Max-Age=2592000/);
});

test('on plain-http localhost the cookie drops the Secure flag so sign-in still works', async () => {
  const local = createHandlers({ repo: createRepository(db), login, now: () => clock, logger: quiet, secureCookies: false });

  const { response, setCookie } = await signIn({ use: local });

  assert.equal(response.status, 200);
  assert.match(setCookie, /HttpOnly; SameSite=Strict/);
  assert.doesNotMatch(setCookie, /Secure/);
});

test('the session cookie keeps the visitor signed in', async () => {
  const { cookie } = await signIn();

  const response = await call('session', 'GET', { cookie });

  assert.deepEqual((await response.json()).data, { signedIn: true, userId: 'harsha' });
});

test('a wrong password is refused with one generic message and no cookie', async () => {
  const wrongPassword = await call('session', 'POST', { body: { userId: 'harsha', password: 'nope' } });
  const wrongUser = await call('session', 'POST', { body: { userId: 'nobody', password: PASSWORD } });

  assert.equal(wrongPassword.status, 401);
  assert.equal(wrongPassword.headers.get('set-cookie'), null);
  assert.deepEqual(await wrongPassword.json(), await wrongUser.json());
});

test('five wrong tries from one address lock that address out, even with the right password', async () => {
  for (let i = 0; i < 5; i++) await call('session', 'POST', { body: { userId: 'harsha', password: 'nope' } });

  const locked = await signIn();
  const elsewhere = await signIn({ ip: '198.51.100.20' });

  assert.equal(locked.response.status, 429);
  assert.equal((await locked.response.json()).error.code, 'too_many_tries');
  assert.equal(elsewhere.response.status, 200);
});

test('a burst of tries sent at once is counted before any password is checked', async () => {
  const burst = Array.from({ length: 20 }, () => call('session', 'POST', { body: { userId: 'harsha', password: 'nope' } }));

  const statuses = (await Promise.all(burst)).map((response) => response.status);

  assert.equal(statuses.filter((status) => status === 401).length, 5);
  assert.equal(statuses.filter((status) => status === 429).length, 15);
});

test('addresses in the same IPv6 network share one lockout', async () => {
  const wrong = { body: { userId: 'harsha', password: 'nope' } };
  for (let i = 0; i < 5; i++) await call('session', 'POST', { ...wrong, ip: `2001:db8:1:2::${i + 1}` });

  const sameNetwork = await signIn({ ip: '2001:db8:1:2:ffff:0:0:9' });
  const otherNetwork = await signIn({ ip: '2001:db8:1:3::1' });

  assert.equal(sameNetwork.response.status, 429);
  assert.equal(otherNetwork.response.status, 200);
});

test('a locked-out address is let back in once the waiting time has passed', async () => {
  for (let i = 0; i < 5; i++) await call('session', 'POST', { body: { userId: 'harsha', password: 'nope' } });
  await db.query(`UPDATE deepwork_sign_in_attempts SET attempted_at = now() - interval '16 minutes'`);

  const { response } = await signIn();

  assert.equal(response.status, 200);
});

test('a successful sign-in clears earlier wrong tries', async () => {
  for (let i = 0; i < 4; i++) await call('session', 'POST', { body: { userId: 'harsha', password: 'nope' } });
  await signIn();
  for (let i = 0; i < 4; i++) await call('session', 'POST', { body: { userId: 'harsha', password: 'nope' } });

  const { response } = await signIn();

  assert.equal(response.status, 200);
});

test('a sign-in sent from another website is refused', async () => {
  const foreign = await signIn({ origin: 'https://evil.test' });
  const noOrigin = await signIn({ origin: null });

  assert.equal(foreign.response.status, 403);
  assert.equal(noOrigin.response.status, 403);
});

test('signing out clears the cookie', async () => {
  const { cookie } = await signIn();

  const response = await call('session', 'DELETE', { cookie });

  assert.equal(response.status, 200);
  assert.match(response.headers.get('set-cookie'), /^dw_session=;.*Max-Age=0/);
});

test('an expired session no longer works', async () => {
  const { cookie } = await signIn();
  clock += 31 * 24 * 60 * 60 * 1000;

  const response = await call('data', 'GET', { cookie });

  assert.equal(response.status, 401);
  assert.equal((await response.json()).error.code, 'signed_out');
});

test('the list cannot be read or changed without signing in', async () => {
  const read = await call('data', 'GET');
  const write = await call('doc', 'PUT', { path: '?coll=tasks&id=t1', body: TASK });
  const forged = await call('data', 'GET', { cookie: 'dw_session=v1.aGFyc2hh.9999999999.forged' });

  assert.equal(read.status, 401);
  assert.equal(write.status, 401);
  assert.equal(forged.status, 401);
});

test('a saved task and planned hour come back when the list is loaded', async () => {
  const { cookie } = await signIn();

  const savedTask = await call('doc', 'PUT', { path: '?coll=tasks&id=t1', body: TASK, cookie });
  const savedBlock = await call('doc', 'PUT', { path: '?coll=blocks&id=b1', body: BLOCK, cookie });
  const loaded = await (await call('data', 'GET', { cookie })).json();

  assert.equal(savedTask.status, 200);
  assert.equal(savedBlock.status, 200);
  assert.deepEqual(loaded.data, { tasks: [{ id: 't1', ...TASK }], blocks: [{ id: 'b1', ...BLOCK }] });
});

test('saving the same task again replaces it', async () => {
  const { cookie } = await signIn();
  await call('doc', 'PUT', { path: '?coll=tasks&id=t1', body: TASK, cookie });

  await call('doc', 'PUT', { path: '?coll=tasks&id=t1', body: { ...TASK, done: true, doneAt: 5 }, cookie });
  const loaded = await (await call('data', 'GET', { cookie })).json();

  assert.equal(loaded.data.tasks.length, 1);
  assert.equal(loaded.data.tasks[0].done, true);
});

test('a removed task is gone, and removing it twice is harmless', async () => {
  const { cookie } = await signIn();
  await call('doc', 'PUT', { path: '?coll=tasks&id=t1', body: TASK, cookie });

  const first = await call('doc', 'DELETE', { path: '?coll=tasks&id=t1', cookie });
  const second = await call('doc', 'DELETE', { path: '?coll=tasks&id=t1', cookie });
  const loaded = await (await call('data', 'GET', { cookie })).json();

  assert.equal(first.status, 200);
  assert.equal(second.status, 200);
  assert.deepEqual(loaded.data.tasks, []);
});

test('bad input is refused before it reaches the database', async () => {
  const { cookie } = await signIn();
  const cases = [
    { path: '?coll=users&id=t1', body: TASK },
    { path: '?coll=tasks&id=bad id', body: TASK },
    { path: '?coll=tasks', body: TASK },
    { path: '?coll=tasks&id=t1', body: { ...TASK, title: '' } },
    { path: '?coll=blocks&id=b1', body: { ...BLOCK, hour: 99 } },
    { path: '?coll=tasks&id=t1', raw: '{not json' },
    { path: '?coll=tasks&id=t1', raw: '[1,2]' },
  ];

  for (const options of cases) {
    const response = await call('doc', 'PUT', { ...options, cookie });
    assert.equal(response.status, 400, JSON.stringify(options));
  }
  const loaded = await (await call('data', 'GET', { cookie })).json();
  assert.deepEqual(loaded.data, { tasks: [], blocks: [] });
});

test('an oversized request body is refused', async () => {
  const { cookie } = await signIn();
  const raw = JSON.stringify({ ...TASK, pad: 'x'.repeat(9000) });

  const response = await call('doc', 'PUT', { path: '?coll=tasks&id=t1', raw, cookie });

  assert.equal(response.status, 413);
});

test('a change sent from another website is refused even with a valid cookie', async () => {
  const { cookie } = await signIn();

  const response = await call('doc', 'PUT', { path: '?coll=tasks&id=t1', body: TASK, cookie, origin: 'https://evil.test' });

  assert.equal(response.status, 403);
});

test('the list stops growing at its size limit but existing tasks can still be edited', async () => {
  const small = createHandlers({ repo: createRepository(db), login, now: () => clock, logger: quiet, limits: { tasks: 1, blocks: 1 } });
  const { cookie } = await signIn({ use: small });
  await call('doc', 'PUT', { path: '?coll=tasks&id=t1', body: TASK, cookie, use: small });

  const overLimit = await call('doc', 'PUT', { path: '?coll=tasks&id=t2', body: TASK, cookie, use: small });
  const edit = await call('doc', 'PUT', { path: '?coll=tasks&id=t1', body: { ...TASK, title: 'Edited' }, cookie, use: small });

  assert.equal(overLimit.status, 409);
  assert.equal((await overLimit.json()).error.code, 'quota_exceeded');
  assert.equal(edit.status, 200);
});

test('unsupported methods are refused', async () => {
  const { cookie } = await signIn();

  assert.equal((await call('data', 'POST', { cookie, body: {} })).status, 405);
  assert.equal((await call('doc', 'GET', { cookie, path: '?coll=tasks&id=t1' })).status, 405);
  assert.equal((await call('session', 'PUT', { body: {} })).status, 405);
});

const NEW_PASSWORD = 'a-brand-new-passphrase';
const changePassword = (cookie, body, options = {}) => call('password', 'PUT', { body, cookie, ...options });
const cookieOf = (response) => (response.headers.get('set-cookie') || '').split(';')[0];

test('the right current password changes the password and keeps this device signed in', async () => {
  const { cookie } = await signIn();

  const response = await changePassword(cookie, { currentPassword: PASSWORD, newPassword: NEW_PASSWORD });
  const stillIn = await call('data', 'GET', { cookie: cookieOf(response) });

  assert.equal(response.status, 200);
  assert.match(cookieOf(response), /^dw_session=v1\./);
  assert.equal(stillIn.status, 200);
});

test('after a change the old password stops working and the new one signs in', async () => {
  const { cookie } = await signIn();
  await changePassword(cookie, { currentPassword: PASSWORD, newPassword: NEW_PASSWORD });

  const oldPassword = await signIn();
  const newPassword = await call('session', 'POST', { body: { userId: 'harsha', password: NEW_PASSWORD } });

  assert.equal(oldPassword.response.status, 401);
  assert.equal(newPassword.status, 200);
});

test('after a change every other signed-in device is signed out', async () => {
  const { cookie: otherDevice } = await signIn();
  const { cookie } = await signIn();
  await changePassword(cookie, { currentPassword: PASSWORD, newPassword: NEW_PASSWORD });

  const response = await call('data', 'GET', { cookie: otherDevice });

  assert.equal(response.status, 401);
});

test('the new password is kept in the database, so a fresh server instance uses it', async () => {
  const { cookie } = await signIn();
  await changePassword(cookie, { currentPassword: PASSWORD, newPassword: NEW_PASSWORD });
  const freshInstance = createHandlers({ repo: createRepository(db), login, now: () => clock, logger: quiet });

  const response = await call('session', 'POST', { body: { userId: 'harsha', password: NEW_PASSWORD }, use: freshInstance });

  assert.equal(response.status, 200);
});

test('a wrong current password is refused and nothing changes', async () => {
  const { cookie } = await signIn();

  const response = await changePassword(cookie, { currentPassword: 'not it', newPassword: NEW_PASSWORD });
  const oldStillWorks = await signIn();

  assert.equal(response.status, 401);
  assert.equal((await response.json()).error.code, 'wrong_password');
  assert.equal(oldStillWorks.response.status, 200);
});

test('a new password that is too short, too long or the same as the old one is refused', async () => {
  const { cookie } = await signIn();
  const cases = [
    { currentPassword: PASSWORD, newPassword: 'short' },
    { currentPassword: PASSWORD, newPassword: 'x'.repeat(201) },
    { currentPassword: PASSWORD, newPassword: PASSWORD },
    { currentPassword: PASSWORD, newPassword: 12345678901234 },
    { currentPassword: PASSWORD },
  ];

  for (const body of cases) {
    const response = await changePassword(cookie, body);
    assert.equal(response.status, 400, JSON.stringify(body).slice(0, 60));
  }
  assert.equal((await signIn()).response.status, 200, 'the old password still works');
});

test('changing the password needs a signed-in session', async () => {
  const response = await changePassword(undefined, { currentPassword: PASSWORD, newPassword: NEW_PASSWORD });

  assert.equal(response.status, 401);
});

test('a password change sent from another website is refused', async () => {
  const { cookie } = await signIn();

  const response = await changePassword(cookie, { currentPassword: PASSWORD, newPassword: NEW_PASSWORD }, { origin: 'https://evil.test' });

  assert.equal(response.status, 403);
});

test('guessing the current password is limited the same way as signing in', async () => {
  const { cookie } = await signIn();
  const guess = { currentPassword: 'wrong', newPassword: NEW_PASSWORD };
  for (let i = 0; i < 5; i++) await changePassword(cookie, guess);

  const locked = await changePassword(cookie, { currentPassword: PASSWORD, newPassword: NEW_PASSWORD });

  assert.equal(locked.status, 429);
});

test('only PUT is accepted when changing the password', async () => {
  const { cookie } = await signIn();

  assert.equal((await call('password', 'GET', { cookie })).status, 405);
  assert.equal((await call('password', 'POST', { cookie, body: {} })).status, 405);
});

test('without a login or a database the API says it is not set up', async () => {
  const noLogin = createHandlers({ repo: createRepository(db), login: null, logger: quiet });
  const noDatabase = createHandlers({ repo: null, login, logger: quiet });

  assert.equal((await call('session', 'GET', { use: noLogin })).status, 503);
  assert.equal((await call('data', 'GET', { use: noDatabase })).status, 503);
});

test('a database failure returns a plain error and leaks no details', async () => {
  const broken = { query: async () => { throw new Error('connection refused at 10.0.0.5:5432 password=hunter2'); } };
  const failing = createHandlers({ repo: createRepository(broken), login, now: () => clock, logger: quiet });
  const { cookie } = await signIn();

  const response = await call('data', 'GET', { cookie, use: failing });
  const text = await response.text();

  assert.equal(response.status, 500);
  assert.equal(text.includes('hunter2'), false);
  assert.equal(JSON.parse(text).error.code, 'server_error');
});
