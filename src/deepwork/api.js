/* Deep Work API: every action the page can take, one named function each.
   The page never calls fetch itself, so an assistant can drive Deep Work through these same functions. */

const BASE = '/api/deepwork';
const OFFLINE_MESSAGE = 'Cannot reach Deep Work. Check your connection and try again.';
const TIMEOUT_MS = 15000;

/** An API failure with a short code (`signed_out`, `wrong_login`, `unavailable`, ...) and a message safe to show. */
export class ApiError extends Error {
  /** @param {string} code @param {string} message @param {number} status */
  constructor(code, message, status) {
    super(message);
    this.name = 'ApiError';
    this.code = code;
    this.status = status;
  }
}

async function request(method, path, body) {
  /* The time limit matters: a request that never answers would otherwise stall syncing for good. */
  const init = { method, credentials: 'same-origin', cache: 'no-store', signal: AbortSignal.timeout(TIMEOUT_MS) };
  const options = body === undefined ? init : { ...init, headers: { 'content-type': 'application/json' }, body: JSON.stringify(body) };
  let response;
  try {
    response = await fetch(BASE + path, options);
  } catch {
    throw new ApiError('unavailable', OFFLINE_MESSAGE, 0);
  }
  const payload = await response.json().catch(() => null);
  if (response.ok && payload && payload.ok === true) return payload.data;
  const error = (payload && payload.error) || {};
  const isOutage = !error.code || (response.status >= 500 && error.code !== 'not_configured');
  throw new ApiError(isOutage ? 'unavailable' : error.code, isOutage ? OFFLINE_MESSAGE : error.message, response.status);
}

const docPath = (collection, id) => `/doc?coll=${collection}&id=${encodeURIComponent(id)}`;

/** Check whether this browser is signed in. Resolves to `{ signedIn, userId }`. */
export const getSession = () => request('GET', '/session');

/** Sign in with a user ID and password. Resolves to `{ signedIn, userId }`. */
export const signIn = (userId, password) => request('POST', '/session', { userId, password });

/** Sign out on this browser. */
export const signOut = () => request('DELETE', '/session');

/** Load every task and planned hour. Resolves to `{ tasks: [...], blocks: [...] }`, each item carrying its `id`. */
export const getPlannerData = () => request('GET', '/data');

/** Create a task or replace it. `task` is `{ title, deadline, repeat, done, doneAt, lastDone, createdAt }`. */
export const saveTask = (id, task) => request('PUT', docPath('tasks', id), task);

/** Remove a task. */
export const deleteTask = (id) => request('DELETE', docPath('tasks', id));

/** Plan a task into an hour, or replace that plan. `block` is `{ taskId, date, hour, done, createdAt }`. */
export const saveBlock = (id, block) => request('PUT', docPath('blocks', id), block);

/** Take a task out of an hour. */
export const deleteBlock = (id) => request('DELETE', docPath('blocks', id));
