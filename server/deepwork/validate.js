import { COLLECTIONS, TITLE_MAX_LENGTH } from './config.js';

const DOC_ID_PATTERN = /^[A-Za-z0-9_-]{1,64}$/;
const DATE_PATTERN = /^(\d{4})-(\d{2})-(\d{2})$/;
const LAST_HOUR = 23;

const accept = (value) => ({ ok: true, value });
const reject = (error) => ({ ok: false, error });

/** @param {unknown} value @returns {boolean} */
export const isDocId = (value) => typeof value === 'string' && DOC_ID_PATTERN.test(value);

/** @param {unknown} value @returns {boolean} */
export const isCollection = (value) => typeof value === 'string' && COLLECTIONS.includes(value);

const isPlainObject = (value) => value !== null && typeof value === 'object' && !Array.isArray(value);
const isTimestamp = (value) => Number.isFinite(value) && value >= 0;

/** A real calendar date written as YYYY-MM-DD. */
function isDate(value) {
  const match = typeof value === 'string' ? DATE_PATTERN.exec(value) : null;
  if (!match) return false;
  const [year, month, day] = [Number(match[1]), Number(match[2]), Number(match[3])];
  const date = new Date(Date.UTC(year, month - 1, day));
  return date.getUTCFullYear() === year && date.getUTCMonth() === month - 1 && date.getUTCDate() === day;
}

const isDateOrEmpty = (value) => value === '' || isDate(value);

/**
 * Check a task sent by the browser and return a copy holding only the known fields.
 * @param {unknown} input
 * @returns {{ ok: true, value: object } | { ok: false, error: string }}
 */
export function cleanTask(input) {
  if (!isPlainObject(input)) return reject('A task must be an object.');
  const title = typeof input.title === 'string' ? input.title.trim() : '';
  if (!title || title.length > TITLE_MAX_LENGTH) return reject(`A task needs a title of 1 to ${TITLE_MAX_LENGTH} characters.`);
  if (!isDateOrEmpty(input.deadline)) return reject('The deadline must be a date like 2026-12-17, or empty.');
  if (!isDateOrEmpty(input.lastDone)) return reject('The last-done day must be a date like 2026-12-17, or empty.');
  if (typeof input.repeat !== 'boolean' || typeof input.done !== 'boolean') return reject('Repeat and done must be true or false.');
  if (!isTimestamp(input.doneAt) || !isTimestamp(input.createdAt)) return reject('Times must be zero or a positive number.');
  return accept({
    title,
    deadline: input.deadline,
    repeat: input.repeat,
    done: input.done,
    doneAt: input.doneAt,
    lastDone: input.lastDone,
    createdAt: input.createdAt,
  });
}

/**
 * Check a planned hour sent by the browser and return a copy holding only the known fields.
 * @param {unknown} input
 * @returns {{ ok: true, value: object } | { ok: false, error: string }}
 */
export function cleanBlock(input) {
  if (!isPlainObject(input)) return reject('A planned hour must be an object.');
  if (!isDocId(input.taskId)) return reject('A planned hour must point at a task.');
  if (!isDate(input.date)) return reject('The day must be a date like 2026-12-17.');
  if (!Number.isInteger(input.hour) || input.hour < 0 || input.hour > LAST_HOUR) return reject('The hour must be 0 to 23.');
  if (typeof input.done !== 'boolean') return reject('Done must be true or false.');
  if (!isTimestamp(input.createdAt)) return reject('Times must be zero or a positive number.');
  return accept({ taskId: input.taskId, date: input.date, hour: input.hour, done: input.done, createdAt: input.createdAt });
}

/** Pick the checker for a collection. */
export const cleanDoc = (collection, input) => (collection === 'tasks' ? cleanTask(input) : cleanBlock(input));
