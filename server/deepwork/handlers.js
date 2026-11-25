import { checkCredentials, createSessionToken, readSessionToken, sessionKey } from './auth.js';
import { DOC_LIMITS, MAX_BODY_BYTES, SESSION_COOKIE, SESSION_TTL_SECONDS, SIGN_IN_MAX_ATTEMPTS, SIGN_IN_WINDOW_MINUTES } from './config.js';
import { clientAddress, expiredCookie, fail, isSameOrigin, ok, readCookie, readJsonBody, sessionCookie, throttleKey } from './http.js';
import { cleanDoc, isCollection, isDocId } from './validate.js';

const notSetUp = () => fail(503, 'not_configured', 'Deep Work is not set up yet.');
const signedOut = () => fail(401, 'signed_out', 'Sign in to continue.');
const otherSite = () => fail(403, 'forbidden', 'That request was not sent from this site.');
const wrongMethod = (allow) => fail(405, 'method_not_allowed', 'That action is not supported here.', { allow });

/**
 * Build the three Deep Work request handlers. Each takes a web Request and returns a web Response.
 * @param {object} deps
 * @param {ReturnType<import('./repository.js').createRepository> | null} deps.repo
 * @param {{ userId: string, passwordHash: string } | null} deps.login
 * @param {() => number} [deps.now] Milliseconds since 1970; replaceable in tests.
 * @param {{ tasks: number, blocks: number }} [deps.limits]
 * @param {{ error: Function }} [deps.logger]
 * @param {boolean} [deps.secureCookies] True everywhere except plain-http localhost.
 */
export function createHandlers({ repo, login, now = Date.now, limits = DOC_LIMITS, logger = console, secureCookies = true }) {
  const isReady = Boolean(repo && login);
  const key = isReady ? sessionKey(login) : null;
  const nowSeconds = () => Math.floor(now() / 1000);

  const currentUser = (request) => {
    const userId = readSessionToken(readCookie(request, SESSION_COOKIE), key, nowSeconds());
    return userId === login.userId ? userId : null;
  };

  /** Wrap a handler so setup gaps and crashes become plain replies with no internal detail. */
  const guard = (handle) => async (request) => {
    if (!isReady) return notSetUp();
    try {
      return await handle(request);
    } catch (error) {
      logger.error('[deepwork] request failed', { method: request.method, path: new URL(request.url).pathname, error });
      return fail(500, 'server_error', 'Something went wrong. Try again.');
    }
  };

  async function signIn(request) {
    if (!isSameOrigin(request)) return otherSite();
    /* Count the try before the slow password check, so a burst cannot run many checks at once. */
    const address = throttleKey(clientAddress(request));
    if (!(await repo.allowAttempt(address, SIGN_IN_WINDOW_MINUTES, SIGN_IN_MAX_ATTEMPTS))) {
      return fail(429, 'too_many_tries', `Too many tries. Wait ${SIGN_IN_WINDOW_MINUTES} minutes and try again.`);
    }
    const body = await readJsonBody(request, MAX_BODY_BYTES);
    if (!body.ok) return body.response;
    if (!(await checkCredentials(login, body.value.userId, body.value.password))) {
      return fail(401, 'wrong_login', 'Wrong user ID or password.');
    }
    await repo.clearAttempts(address);
    const token = createSessionToken(login.userId, key, nowSeconds(), SESSION_TTL_SECONDS);
    return ok({ signedIn: true, userId: login.userId }, { 'set-cookie': sessionCookie(token, SESSION_TTL_SECONDS, secureCookies) });
  }

  function signOut(request) {
    if (!isSameOrigin(request)) return otherSite();
    return ok({ signedIn: false, userId: null }, { 'set-cookie': expiredCookie(secureCookies) });
  }

  /** GET tells the page whether it is signed in, POST signs in, DELETE signs out. */
  const session = guard(async (request) => {
    if (request.method === 'GET') {
      const userId = currentUser(request);
      return ok({ signedIn: Boolean(userId), userId });
    }
    if (request.method === 'POST') return signIn(request);
    if (request.method === 'DELETE') return signOut(request);
    return wrongMethod('GET, POST, DELETE');
  });

  /** GET returns every task and planned hour for the signed-in user. */
  const data = guard(async (request) => {
    if (request.method !== 'GET') return wrongMethod('GET');
    const userId = currentUser(request);
    if (!userId) return signedOut();
    return ok(await repo.listDocs(userId));
  });

  async function saveDoc(request, userId, collection, id) {
    const body = await readJsonBody(request, MAX_BODY_BYTES);
    if (!body.ok) return body.response;
    const cleaned = cleanDoc(collection, body.value);
    if (!cleaned.ok) return fail(400, 'invalid_argument', cleaned.error);
    const isNew = !(await repo.hasDoc(userId, collection, id));
    if (isNew && (await repo.countDocs(userId, collection)) >= limits[collection]) {
      return fail(409, 'quota_exceeded', 'Your list is full. Delete some finished tasks first.');
    }
    await repo.saveDoc(userId, collection, id, cleaned.value);
    return ok({ id });
  }

  /** PUT saves one task or planned hour, DELETE removes one. Both name it with ?coll=&id=. */
  const doc = guard(async (request) => {
    if (request.method !== 'PUT' && request.method !== 'DELETE') return wrongMethod('PUT, DELETE');
    if (!isSameOrigin(request)) return otherSite();
    const userId = currentUser(request);
    if (!userId) return signedOut();
    const query = new URL(request.url).searchParams;
    const [collection, id] = [query.get('coll'), query.get('id')];
    if (!isCollection(collection) || !isDocId(id)) return fail(400, 'invalid_argument', 'That item could not be found.');
    if (request.method === 'PUT') return saveDoc(request, userId, collection, id);
    await repo.deleteDoc(userId, collection, id);
    return ok({ id });
  });

  return { session, data, doc };
}
