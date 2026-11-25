#!/usr/bin/env node
/* Copy an exported list into Deep Work through its own API.

   Usage:  node scripts/deepwork-import.mjs <site> <export.json> [login-file]
   Example: node scripts/deepwork-import.mjs http://localhost:4173 deepwork-export.json.local

   export.json: { "tasks": [{ "id": "...", ...task }], "blocks": [{ "id": "...", ...block }] }
   The sign-in is read from deepwork-login.local (or the file you name). Nothing secret is printed. */
import { readFileSync } from 'node:fs';

const DEFAULT_LOGIN_FILE = 'deepwork-login.local';
const API = '/api/deepwork';
const COLLECTIONS = ['tasks', 'blocks'];

function readLogin(file) {
  const text = readFileSync(file, 'utf8');
  const userId = /^User ID:\s*(\S+)/m.exec(text);
  const password = /^Password:\s*(\S+)/m.exec(text);
  if (!userId || !password) throw new Error(`Could not find "User ID:" and "Password:" lines in ${file}.`);
  return { userId: userId[1], password: password[1] };
}

async function call(site, method, path, { body, cookie } = {}) {
  const headers = { origin: site, ...(cookie ? { cookie } : {}), ...(body ? { 'content-type': 'application/json' } : {}) };
  const response = await fetch(`${site}${API}${path}`, { method, headers, body: body ? JSON.stringify(body) : undefined });
  const payload = await response.json().catch(() => null);
  if (!response.ok || !payload || !payload.ok) {
    const reason = payload && payload.error ? payload.error.message : `HTTP ${response.status}`;
    throw new Error(`${method} ${path.split('?')[0]} failed: ${reason}`);
  }
  return { data: payload.data, cookie: (response.headers.get('set-cookie') || '').split(';')[0] };
}

async function main() {
  const [siteArg, exportFile, loginFile = DEFAULT_LOGIN_FILE] = process.argv.slice(2);
  if (!siteArg || !exportFile) throw new Error('Usage: node scripts/deepwork-import.mjs <site> <export.json> [login-file]');
  const site = new URL(siteArg).origin;
  const exported = JSON.parse(readFileSync(exportFile, 'utf8'));

  const { cookie } = await call(site, 'POST', '/session', { body: readLogin(loginFile) });
  const saved = {};
  for (const collection of COLLECTIONS) {
    const items = Array.isArray(exported[collection]) ? exported[collection] : [];
    for (const { id, ...body } of items) {
      await call(site, 'PUT', `/doc?coll=${collection}&id=${encodeURIComponent(id)}`, { body, cookie });
    }
    saved[collection] = items.length;
  }
  const { data } = await call(site, 'GET', '/data', { cookie });
  process.stdout.write(`Saved ${saved.tasks} tasks and ${saved.blocks} planned hours to ${site}. It now holds ${data.tasks.length} tasks and ${data.blocks.length} planned hours.\n`);
}

main().catch((error) => {
  process.stderr.write(`${error.message}\n`);
  process.exitCode = 1;
});
