import { Buffer } from 'node:buffer';
import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { loadEnv } from 'vite';
import { parseLogin } from './auth.js';
import { API_PATH } from './config.js';
import { createHandlers } from './handlers.js';
import { fail } from './http.js';
import { createRepository } from './repository.js';

const DEV_DATA_DIR = 'deepwork-dev-db.local';
const MAX_DEV_BODY_BYTES = 64 * 1024;
const ROUTES = new Set(['session', 'data', 'doc']);

/** Use DATABASE_URL when .env.local has one; otherwise a small Postgres kept in a git-ignored folder. */
async function openDatabase(root, env) {
  if (env.DATABASE_URL) {
    const { default: pg } = await import('pg');
    return new pg.Pool({ connectionString: env.DATABASE_URL, max: 2 });
  }
  const { PGlite } = await import('@electric-sql/pglite');
  return new PGlite(path.join(root, DEV_DATA_DIR));
}

async function loadHandlers(root, mode) {
  const env = loadEnv(mode, root, ['DEEPWORK_', 'DATABASE_URL']);
  return createHandlers({
    repo: createRepository(await openDatabase(root, env)),
    login: parseLogin(env.DEEPWORK_LOGIN),
    secureCookies: false, // localhost is plain http; a Secure cookie would be dropped
  });
}

/** Read the request body, or return null when it is larger than the local limit. */
async function readBody(req) {
  const chunks = [];
  let total = 0;
  for await (const chunk of req) {
    total += chunk.length;
    if (total > MAX_DEV_BODY_BYTES) {
      req.resume();
      return null;
    }
    chunks.push(chunk);
  }
  return Buffer.concat(chunks);
}

function toWebRequest(req, body) {
  const headers = new Headers();
  for (const [name, value] of Object.entries(req.headers)) {
    if (value !== undefined) headers.set(name, Array.isArray(value) ? value.join(', ') : value);
  }
  headers.delete('x-forwarded-for');
  headers.set('x-real-ip', req.socket.remoteAddress || 'local');
  const hasBody = req.method !== 'GET' && req.method !== 'HEAD' && body.length > 0;
  return new Request(`http://${req.headers.host}${req.originalUrl}`, { method: req.method, headers, body: hasBody ? body : undefined });
}

async function sendWebResponse(res, response) {
  res.statusCode = response.status;
  response.headers.forEach((value, name) => {
    if (name !== 'set-cookie') res.setHeader(name, value);
  });
  const cookies = response.headers.getSetCookie();
  if (cookies.length) res.setHeader('set-cookie', cookies);
  res.end(Buffer.from(await response.arrayBuffer()));
}

function apiMiddleware(getRoot, getMode) {
  let handlers = null;
  /* Open the database once. Only a failed open is forgotten, so a later request can try again. */
  const getHandlers = () => {
    if (!handlers) {
      handlers = loadHandlers(getRoot(), getMode()).catch((error) => {
        handlers = null;
        throw error;
      });
    }
    return handlers;
  };
  return async (req, res, next) => {
    const route = new URL(req.url, 'http://local').pathname.split('/')[1];
    if (!ROUTES.has(route)) return next();
    try {
      const body = await readBody(req);
      const response = body === null
        ? fail(413, 'too_large', 'That is too much to save at once.')
        : await (await getHandlers())[route](toWebRequest(req, body));
      await sendWebResponse(res, response);
    } catch (error) {
      next(error);
    }
  };
}

/** Apply the security headers from vercel.json so the built preview behaves like the live site. */
function headerMiddleware(getRoot) {
  let rules = null;
  const load = () => {
    const file = path.join(getRoot(), 'vercel.json');
    const config = existsSync(file) ? JSON.parse(readFileSync(file, 'utf8')) : {};
    return (config.headers || []).map((rule) => ({ pattern: new RegExp(`^${rule.source}$`), headers: rule.headers }));
  };
  return (req, res, next) => {
    if (!rules) rules = load();
    const pathname = new URL(req.originalUrl || req.url, 'http://local').pathname;
    for (const rule of rules) {
      if (rule.pattern.test(pathname)) rule.headers.forEach((header) => res.setHeader(header.key, header.value));
    }
    next();
  };
}

/**
 * Vite plugin: serve the Deep Work API on localhost with the same handlers the live site uses.
 * @returns {import('vite').Plugin}
 */
export function deepWorkDevApi() {
  let config = null;
  const api = apiMiddleware(() => config.root, () => config.mode);
  return {
    name: 'deepwork-dev-api',
    configResolved(resolved) {
      config = resolved;
    },
    configureServer(server) {
      server.middlewares.use(API_PATH, api);
    },
    configurePreviewServer(server) {
      server.middlewares.use(headerMiddleware(() => config.root));
      server.middlewares.use(API_PATH, api);
    },
  };
}
