import process from 'node:process';
import pg from 'pg';
import { parseLogin } from './auth.js';
import { createHandlers } from './handlers.js';
import { createRepository } from './repository.js';

const MAX_CONNECTIONS = 3;

let handlers = null;

/** Build the handlers once per server instance from the hosting settings. */
function getHandlers() {
  if (handlers) return handlers;
  const databaseUrl = process.env.DATABASE_URL || process.env.POSTGRES_URL;
  const pool = databaseUrl ? new pg.Pool({ connectionString: databaseUrl, max: MAX_CONNECTIONS }) : null;
  if (pool) pool.on('error', (error) => console.error('[deepwork] idle database connection failed', error));
  handlers = createHandlers({
    repo: pool ? createRepository(pool) : null,
    login: parseLogin(process.env.DEEPWORK_LOGIN),
  });
  return handlers;
}

/** @param {Request} request @returns {Promise<Response>} */
export const handleSession = (request) => getHandlers().session(request);

/** @param {Request} request @returns {Promise<Response>} */
export const handlePassword = (request) => getHandlers().password(request);

/** @param {Request} request @returns {Promise<Response>} */
export const handleData =(request) => getHandlers().data(request);

/** @param {Request} request @returns {Promise<Response>} */
export const handleDoc = (request) => getHandlers().doc(request);
