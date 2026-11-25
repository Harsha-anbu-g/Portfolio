#!/usr/bin/env node
/* Create the Deep Work sign-in.

   Usage:  node scripts/deepwork-make-login.mjs [userId] [--replace] [--choose]
     --replace  make a new sign-in even though one exists
     --choose   type your own password (hidden) instead of getting a random one

   Writes two git-ignored files in the project root:
     deepwork-login.local  the user ID, the password, and the hosting setting to paste
     .env.local            the same setting, so localhost uses the same sign-in
   It prints file names only. The password is never printed. */
import { randomInt } from 'node:crypto';
import { chmodSync, existsSync, readFileSync, writeFileSync } from 'node:fs';
import { formatLogin, hashPassword, isUserId } from '../server/deepwork/auth.js';

const LOGIN_FILE = 'deepwork-login.local';
const ENV_FILE = '.env.local';
const SETTING = 'DEEPWORK_LOGIN';
const DEFAULT_USER_ID = 'harsha';
const ALPHABET = 'abcdefghjkmnpqrstuvwxyz23456789'; // no look-alikes such as i, l, o, 0, 1
const GROUPS = 4;
const GROUP_LENGTH = 5;
const OWNER_ONLY = 0o600;

const MIN_PASSWORD_LENGTH = 12;
const MAX_PASSWORD_LENGTH = 200;

/** Ask for a password in the terminal without showing what is typed. Run it in your own terminal. */
function askPassword(prompt) {
  if (!process.stdin.isTTY) throw new Error('--choose needs a real terminal, so run it yourself, not through an assistant.');
  return new Promise((resolve) => {
    let typed = '';
    process.stdout.write(prompt);
    process.stdin.setRawMode(true);
    process.stdin.resume();
    process.stdin.setEncoding('utf8');
    process.stdin.on('data', function onKey(key) {
      for (const char of key) {
        if (char === '\u0003') process.exit(130); // Ctrl+C
        if (char === '\r' || char === '\n') {
          process.stdin.setRawMode(false);
          process.stdin.pause();
          process.stdin.off('data', onKey);
          process.stdout.write('\n');
          resolve(typed);
          return;
        }
        typed = char === '\u007f' ? typed.slice(0, -1) : typed + char;
      }
    });
  });
}

async function chosenPassword() {
  const first = await askPassword('New password: ');
  if (first.length < MIN_PASSWORD_LENGTH || first.length > MAX_PASSWORD_LENGTH) {
    throw new Error(`The password must be ${MIN_PASSWORD_LENGTH} to ${MAX_PASSWORD_LENGTH} characters.`);
  }
  if ((await askPassword('Type it again: ')) !== first) throw new Error('The two did not match. Nothing was changed.');
  return first;
}

const randomGroup = () => Array.from({ length: GROUP_LENGTH }, () => ALPHABET[randomInt(ALPHABET.length)]).join('');
const makePassword = () => Array.from({ length: GROUPS }, randomGroup).join('-');

/** Replace the setting's line in .env.local, or add it, leaving every other line alone. */
function withSetting(envText, line) {
  const kept = envText.split('\n').filter((existing) => existing && !existing.startsWith(`${SETTING}=`));
  return `${[...kept, line].join('\n')}\n`;
}

async function main() {
  const args = process.argv.slice(2);
  const shouldReplace = args.includes('--replace');
  const userId = args.find((arg) => !arg.startsWith('--')) || DEFAULT_USER_ID;

  if (!isUserId(userId)) throw new Error('The user ID must be 3 to 32 lowercase letters, digits, - or _.');
  if (existsSync(LOGIN_FILE) && !shouldReplace) {
    throw new Error(`${LOGIN_FILE} already exists. Add --replace to make a new password (the old one stops working once the new setting is live).`);
  }

  const password = args.includes('--choose') ? await chosenPassword() : makePassword();
  const setting = `${SETTING}=${formatLogin(userId, await hashPassword(password))}`;
  const note = [
    'Deep Work sign-in',
    '',
    `User ID:  ${userId}`,
    `Password: ${password}`,
    '',
    'Hosting setting (one line: the name, then the value after the = sign):',
    setting,
    '',
    'Keep this file private. It is ignored by git. Move the password to your password manager.',
    '',
  ].join('\n');

  writeFileSync(LOGIN_FILE, note, { mode: OWNER_ONLY });
  writeFileSync(ENV_FILE, withSetting(existsSync(ENV_FILE) ? readFileSync(ENV_FILE, 'utf8') : '', setting), { mode: OWNER_ONLY });
  /* The mode above only applies to a newly made file, so set it again for files that already existed. */
  [LOGIN_FILE, ENV_FILE].forEach((file) => chmodSync(file, OWNER_ONLY));
  process.stdout.write(`Sign-in for "${userId}" written to ${LOGIN_FILE}; localhost setting written to ${ENV_FILE}.\n`);
}

main().catch((error) => {
  process.stderr.write(`${error.message}\n`);
  process.exitCode = 1;
});
