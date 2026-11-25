/** Fixed settings for the Deep Work API. Every limit lives here so no handler carries a magic number. */

export const API_PATH = '/api/deepwork';
export const SESSION_COOKIE = 'dw_session';
export const SESSION_TTL_SECONDS = 60 * 60 * 24 * 30;

export const SIGN_IN_MAX_ATTEMPTS = 5;
export const SIGN_IN_WINDOW_MINUTES = 15;
export const ATTEMPT_RETENTION_HOURS = 24;

export const MIN_PASSWORD_LENGTH = 12;
export const MAX_PASSWORD_LENGTH = 200;

export const MAX_BODY_BYTES = 4096;
export const TITLE_MAX_LENGTH = 200;
export const COLLECTIONS = Object.freeze(['tasks', 'blocks']);
export const DOC_LIMITS = Object.freeze({ tasks: 1000, blocks: 5000 });
