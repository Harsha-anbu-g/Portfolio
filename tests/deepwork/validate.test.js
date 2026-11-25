import { test } from 'node:test';
import assert from 'node:assert/strict';
import { cleanBlock, cleanTask, isCollection, isDocId } from '../../server/deepwork/validate.js';

const TASK = {
  title: 'Book the ceremony',
  deadline: '2026-12-17',
  repeat: false,
  done: false,
  doneAt: 0,
  lastDone: '',
  createdAt: 1795631640000,
};
const BLOCK = { taskId: 'book-graduation', date: '2026-11-25', hour: 13, done: false, createdAt: 1795631881672 };

test('document IDs are short and URL-safe', () => {
  assert.equal(isDocId('tmwwguz7sr9b5h'), true);
  assert.equal(isDocId('air-canada-prep'), true);
  assert.equal(isDocId(''), false);
  assert.equal(isDocId('../etc/passwd'), false);
  assert.equal(isDocId("x'; DROP TABLE deepwork_docs;--"), false);
  assert.equal(isDocId('a'.repeat(65)), false);
  assert.equal(isDocId(7), false);
});

test('only the two known collections are accepted', () => {
  assert.equal(isCollection('tasks'), true);
  assert.equal(isCollection('blocks'), true);
  assert.equal(isCollection('users'), false);
  assert.equal(isCollection('__proto__'), false);
});

test('a valid task passes through unchanged', () => {
  assert.deepEqual(cleanTask(TASK), { ok: true, value: TASK });
});

test('a task keeps only known fields and trims its title', () => {
  const result = cleanTask({ ...TASK, title: '  Book the ceremony  ', id: 'x', admin: true });

  assert.deepEqual(result, { ok: true, value: TASK });
});

test('a task with an empty or oversized title is rejected', () => {
  assert.equal(cleanTask({ ...TASK, title: '   ' }).ok, false);
  assert.equal(cleanTask({ ...TASK, title: 'x'.repeat(201) }).ok, false);
  assert.equal(cleanTask({ ...TASK, title: 12 }).ok, false);
});

test('a task with a wrong date or wrong field type is rejected', () => {
  assert.equal(cleanTask({ ...TASK, deadline: '17/12/2026' }).ok, false);
  assert.equal(cleanTask({ ...TASK, deadline: '2026-13-40' }).ok, false);
  assert.equal(cleanTask({ ...TASK, lastDone: 'yesterday' }).ok, false);
  assert.equal(cleanTask({ ...TASK, repeat: 'yes' }).ok, false);
  assert.equal(cleanTask({ ...TASK, doneAt: -1 }).ok, false);
  assert.equal(cleanTask({ ...TASK, createdAt: Infinity }).ok, false);
  assert.equal(cleanTask(null).ok, false);
  assert.equal(cleanTask([TASK]).ok, false);
});

test('a task with no deadline uses an empty string', () => {
  assert.equal(cleanTask({ ...TASK, deadline: '' }).ok, true);
});

test('a valid planned hour passes through unchanged', () => {
  assert.deepEqual(cleanBlock(BLOCK), { ok: true, value: BLOCK });
});

test('a planned hour outside the day, on a bad date or for a bad task is rejected', () => {
  assert.equal(cleanBlock({ ...BLOCK, hour: 24 }).ok, false);
  assert.equal(cleanBlock({ ...BLOCK, hour: -1 }).ok, false);
  assert.equal(cleanBlock({ ...BLOCK, hour: 1.5 }).ok, false);
  assert.equal(cleanBlock({ ...BLOCK, date: '' }).ok, false);
  assert.equal(cleanBlock({ ...BLOCK, taskId: 'no spaces allowed' }).ok, false);
  assert.equal(cleanBlock({ ...BLOCK, done: 1 }).ok, false);
});
