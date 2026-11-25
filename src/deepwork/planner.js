/* The Deep Work planner. This is the planner exactly as first built ("Hour Planner"),
   ported by script: the list, the 24 hour boxes, Today and Tomorrow, every-day tasks and the
   tick-to-finish rules are unchanged. Only storage (now the store passed in) and a small
   hook for the focus view are new. */
import { $, ymd, isYmd, addDays, dayDiff, hourLabel, shortDate, dayDate, newId, isPhone, h, reconcile } from './dom.js';
import { byAge, byDue, normBlock, normTask, toBody } from './records.js';
import { blockChip, taskRow } from './rows.js';

/**
 * Start the planner on the page.
 * @param {{ doc: Function, collection: Function } | null} store Where tasks and planned hours are saved.
 * @param {{ onNow?: Function, onSignedOut?: Function }} [hooks]
 * @returns {{ toggleBlock: (id: string) => void, planThisHour: () => void }}
 */
export function startPlanner(store, hooks = {}) {
  /* ================= clock ================= */
  let now = new Date();
  let today = ymd(now);
  let tomorrow = addDays(today, 1);
  let curHour = now.getHours();
  let curMin = now.getMinutes();

  /* ================= state ================= */
  const S = {
    view: 'today',      // which day the hour boxes show
    tab: 'list',        // phone only
    armed: null,        // { kind: 'task' | 'block', id }
    editing: null,      // task id
    draft: null,        // { title, deadline, repeat }
    confirmDel: null,   // task id waiting for a second tap
    focusNext: null,    // element id to focus after the next render
    pick: null,         // { date, hour } while the picker is open
    scrollToNow: true
  };
  let mode = 'loading';   // loading | live | local | dead
  let slow = false, stale = false;
  let db = null;
  let pendingCount = 0;

  /* ================= data ================= */
  const base = { tasks: new Map(), blocks: new Map() };   // what the store last confirmed
  const pend = { tasks: new Map(), blocks: new Map() };   // this page's unconfirmed writes
  const chains = new Map();                                // one write at a time per document
  let seq = 0;

  function merged(coll) {
    if (!pend[coll].size) return base[coll];
    const m = new Map(base[coll]);
    for (const [id, p] of pend[coll]) { if (p.value === null) m.delete(id); else m.set(id, p.value); }
    return m;
  }
  function cur(coll, id) {
    const p = pend[coll].get(id);
    if (p) return p.value;
    return base[coll].get(id) || null;
  }
  const wait = (ms) => new Promise((r) => setTimeout(r, ms));

  function put(coll, id, value) {
    if (mode === 'local') {
      if (value === null) base[coll].delete(id); else base[coll].set(id, value);
      schedule();
      return;
    }
    if (!db) return;
    const token = ++seq;
    pend[coll].set(id, { value: value, token: token });
    pendingCount++;
    schedule();
    const path = coll + '/' + id;
    const body = value === null ? null : toBody(value);
    const once = () => (value === null ? db.doc(path).delete() : db.doc(path).set(body));
    const run = () => once().catch((e) => {
      if (e && e.code === 'unavailable') return wait(400 + Math.random() * 800).then(once);
      throw e;
    });
    const settle = (ok, err) => {
      pendingCount--;
      if (ok) { if (value === null) base[coll].delete(id); else base[coll].set(id, value); }
      const p = pend[coll].get(id);
      if (p && p.token === token) pend[coll].delete(id);
      if (!ok) saveFailed(err);
      schedule();
    };
    const prev = chains.get(path) || Promise.resolve();
    const next = prev.then(run).then(() => settle(true), (e) => settle(false, e));
    chains.set(path, next);
  }
  function saveFailed(err) {
    const code = err && err.code;
    if (code === 'signed_out') { mode = 'dead'; schedule(); if (hooks.onSignedOut) hooks.onSignedOut(); return; }
    if (code === 'quota_exceeded') toast('Storage is full. Delete some finished tasks and try again.');
    else if (code === 'revoked' || code === 'not_granted' || code === 'capability_disabled' || code === 'capability_removed') {
      mode = 'dead';
      toast('Changes can no longer be saved here. Reload the page.');
    }
    else if (code === 'invalid_argument') toast('That change was not saved. Something in it was not accepted.');
    else toast('That change was not saved. Check your connection and try again.');
  }

  /* ================= model ================= */
  function effDone(b, t) {
    return b.done || (!!t && (t.repeat ? t.lastDone === b.date : t.done));
  }
  function model() {
    const tasks = merged('tasks'), blocks = merged('blocks');
    const byTask = new Map();
    const todayByHour = [], tomByHour = [];
    for (let i = 0; i < 24; i++) { todayByHour.push([]); tomByHour.push([]); }
    for (const b of blocks.values()) {
      if (b.hour < 0 || !tasks.has(b.taskId)) continue;
      if (b.date !== today && b.date !== tomorrow) continue;
      (b.date === today ? todayByHour : tomByHour)[b.hour].push(b);
      if (!byTask.has(b.taskId)) byTask.set(b.taskId, []);
      byTask.get(b.taskId).push(b);
    }
    todayByHour.forEach((l) => l.sort(byAge));
    tomByHour.forEach((l) => l.sort(byAge));
    const all = Array.from(tasks.values());
    return {
      tasks: tasks, blocks: blocks, byTask: byTask, todayByHour: todayByHour, tomByHour: tomByHour,
      daily: all.filter((t) => t.repeat).sort(byDue),
      dated: all.filter((t) => !t.repeat && !t.done && t.deadline).sort(byDue),
      undated: all.filter((t) => !t.repeat && !t.done && !t.deadline).sort(byAge),
      done: all.filter((t) => !t.repeat && t.done).sort((a, b) => (b.doneAt - a.doneAt) || byAge(a, b))
    };
  }
  const viewDate = () => (S.view === 'today' ? today : tomorrow);
  const canWrite = () => mode === 'live' || mode === 'local';

  /* ================= actions ================= */
  function addTask(title, deadline, repeat) {
    const id = newId('t');
    put('tasks', id, { id: id, title: title, deadline: isYmd(deadline) ? deadline : '', repeat: !!repeat, done: false, doneAt: 0, lastDone: '', createdAt: Date.now() });
    return id;
  }
  function addBlock(taskId, date, hour) {
    for (const b of merged('blocks').values()) {
      if (b.taskId === taskId && b.date === date && b.hour === hour) return b.id;
    }
    const id = newId('b');
    put('blocks', id, { id: id, taskId: taskId, date: date, hour: hour, done: false, createdAt: Date.now() });
    prune();
    return id;
  }
  function moveBlock(id, date, hour) {
    const b = cur('blocks', id);
    if (!b || (b.date === date && b.hour === hour)) return;
    for (const o of merged('blocks').values()) {
      if (o.id !== id && o.taskId === b.taskId && o.date === date && o.hour === hour) { put('blocks', id, null); return; }
    }
    put('blocks', id, Object.assign({}, b, { date: date, hour: hour }));
  }
  function removeBlock(id) {
    if (cur('blocks', id)) put('blocks', id, null);
    if (S.armed && S.armed.kind === 'block' && S.armed.id === id) S.armed = null;
  }
  function clearBlockTicks(taskId, date) {
    for (const b of Array.from(merged('blocks').values())) {
      if (b.taskId === taskId && b.done && (!date || b.date === date)) put('blocks', b.id, Object.assign({}, b, { done: false }));
    }
  }
  function toggleBlock(id) {
    const b = cur('blocks', id);
    const t = b && cur('tasks', b.taskId);
    if (!b || !t) return;
    const next = !effDone(b, t);
    if (t.repeat) {
      if (b.done !== next) put('blocks', id, Object.assign({}, b, { done: next }));
      if (!next && t.lastDone === b.date) put('tasks', t.id, Object.assign({}, t, { lastDone: '' }));
    } else if (next) {
      if (!b.done) put('blocks', id, Object.assign({}, b, { done: true }));
      if (!t.done) put('tasks', t.id, Object.assign({}, t, { done: true, doneAt: Date.now() }));
    } else {
      clearBlockTicks(t.id, '');
      if (t.done) put('tasks', t.id, Object.assign({}, t, { done: false, doneAt: 0 }));
    }
  }
  function toggleTask(id) {
    const t = cur('tasks', id);
    if (!t) return;
    if (t.repeat) {
      let doneToday = t.lastDone === today;
      for (const b of merged('blocks').values()) { if (b.taskId === id && b.date === today && b.done) doneToday = true; }
      if (doneToday) {
        clearBlockTicks(id, today);
        if (t.lastDone === today) put('tasks', id, Object.assign({}, t, { lastDone: '' }));
      } else {
        put('tasks', id, Object.assign({}, t, { lastDone: today }));
      }
    } else if (t.done) {
      clearBlockTicks(id, '');
      put('tasks', id, Object.assign({}, t, { done: false, doneAt: 0 }));
    } else {
      put('tasks', id, Object.assign({}, t, { done: true, doneAt: Date.now() }));
    }
  }
  function deleteTask(id) {
    for (const b of Array.from(merged('blocks').values())) { if (b.taskId === id) put('blocks', b.id, null); }
    if (cur('tasks', id)) put('tasks', id, null);
    if (S.editing === id) { S.editing = null; S.draft = null; }
    if (S.armed && S.armed.id === id) S.armed = null;
    S.confirmDel = null;
  }
  function askDelete(id) {
    if (S.confirmDel === id) { deleteTask(id); schedule(); return; }
    S.confirmDel = id;
    setTimeout(() => { if (S.confirmDel === id) { S.confirmDel = null; schedule(); } }, 4000);
    schedule();
  }
  /* Blocks older than a month are cleared while you plan, so the store stays small. */
  function prune() {
    if (mode !== 'live') return;
    const cutoff = addDays(today, -30);
    let n = 0;
    for (const b of Array.from(base.blocks.values())) {
      if (n >= 20) break;
      if (b.date && b.date < cutoff && !pend.blocks.has(b.id)) { put('blocks', b.id, null); n++; }
    }
  }

  function arm(kind, id) {
    if (S.armed && S.armed.kind === kind && S.armed.id === id) S.armed = null;
    else {
      S.armed = { kind: kind, id: id };
      if (isPhone()) setTab('hours');
    }
    schedule();
  }
  function placeArmed(hour) {
    const a = S.armed;
    S.armed = null;
    if (a) {
      if (a.kind === 'task') { if (cur('tasks', a.id)) addBlock(a.id, viewDate(), hour); }
      else moveBlock(a.id, viewDate(), hour);
    }
    schedule();
  }
  function startEdit(id, focusId) {
    const t = cur('tasks', id);
    if (!t) return;
    S.editing = id;
    S.draft = { title: t.title, deadline: t.deadline, repeat: t.repeat };
    S.confirmDel = null;
    S.focusNext = focusId;
    schedule();
  }
  function stopEdit() { S.editing = null; S.draft = null; S.confirmDel = null; schedule(); }
  function saveEdit() {
    const t = S.editing && cur('tasks', S.editing);
    if (!t || !S.draft) { stopEdit(); return; }
    const title = S.draft.title.trim();
    if (!title) { const el = $('edit-title'); if (el) el.focus(); return; }
    put('tasks', t.id, Object.assign({}, t, { title: title, deadline: isYmd(S.draft.deadline) ? S.draft.deadline : '', repeat: !!S.draft.repeat }));
    stopEdit();
  }
  function setTab(tab) {
    S.tab = tab;
    if (tab === 'hours' && S.view === 'today') S.scrollToNow = true;
    schedule();
  }
  function setView(v) {
    S.view = v;
    if (v === 'today') S.scrollToNow = true;
    else $('hours-body').scrollTop = Math.max(0, hourRows[7].row.offsetTop - 4);
    schedule();
  }

  /* ================= toast ================= */
  let toastTimer = 0;
  function toast(msg) {
    const el = $('toast');
    el.textContent = msg;
    el.hidden = false;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => { el.hidden = true; }, 5000);
  }

  /* ================= rendering ================= */
  let raf = 0;
  function schedule() {
    if (raf) return;
    raf = requestAnimationFrame(() => { raf = 0; render(); });
  }

  const hourRows = [];
  function buildHours() {
    const ol = $('hours');
    for (let hr = 0; hr < 24; hr++) {
      const nowTag = h('span', { class: 'hour-now', text: 'Now', hidden: true });
      const blocks = h('div', { class: 'blocks' });
      const row = h('li', { class: 'hour', 'data-hour': hr },
        h('div', { class: 'hour-label' }, h('span', { class: 'hour-time', text: hourLabel(hr) }), nowTag),
        h('div', { class: 'hour-box' }, blocks,
          h('button', { type: 'button', class: 'slot-add', id: 'slot-' + hr, 'aria-label': 'Add a task at ' + hourLabel(hr), text: '+' })));
      ol.append(row);
      hourRows.push({ row: row, nowTag: nowTag, blocks: blocks });
    }
  }

  function dueInfo(t) {
    if (!t.repeat && t.done) {
      return t.doneAt ? { text: 'Finished ' + shortDate(ymd(new Date(t.doneAt))), cls: 'plain' } : null;
    }
    if (!t.deadline) return t.repeat ? null : { text: 'Set a deadline', cls: 'none' };
    const diff = dayDiff(t.deadline, today);
    const date = shortDate(t.deadline);
    if (t.repeat) {
      if (diff < 0) return { text: 'Ended ' + date, cls: 'late' };
      if (diff === 0) return { text: 'Last day today', cls: 'soon' };
      if (diff === 1) return { text: 'Until tomorrow', cls: 'soon' };
      return { text: 'Until ' + date + ' · ' + diff + ' days', cls: diff <= 3 ? 'soon' : '' };
    }
    if (diff < 0) return { text: date + ' · ' + (-diff) + (diff === -1 ? ' day late' : ' days late'), cls: 'late' };
    if (diff === 0) return { text: 'Due today', cls: 'soon' };
    if (diff === 1) return { text: 'Due tomorrow', cls: 'soon' };
    return { text: date + ' · ' + diff + ' days', cls: diff <= 3 ? 'soon' : '' };
  }

  function taskItem(t, m) {
    if (S.editing === t.id && S.draft) {
      const confirm = S.confirmDel === t.id;
      return { key: 't:' + t.id, sig: 'edit:' + (confirm ? 1 : 0) + ':' + (t.repeat ? 1 : 0), build: () => editRow(t, confirm) };
    }
    const mine = m.byTask.get(t.id) || [];
    const tHours = mine.filter((b) => b.date === today).map((b) => b.hour).sort((a, b) => a - b);
    const mHours = mine.filter((b) => b.date === tomorrow).map((b) => b.hour).sort((a, b) => a - b);
    const doneToday = t.repeat && (t.lastDone === today || mine.some((b) => b.date === today && b.done));
    const finished = !t.repeat && t.done;
    const vm = {
      id: t.id, title: t.title, repeat: t.repeat, finished: finished,
      checked: t.repeat ? doneToday : t.done,
      armed: !!(S.armed && S.armed.kind === 'task' && S.armed.id === t.id),
      confirm: S.confirmDel === t.id,
      due: dueInfo(t), plan: [], status: null
    };
    if (!finished) {
      if (tHours.length) vm.plan.push('Today ' + tHours.map(hourLabel).join(', '));
      if (mHours.length) vm.plan.push('Tomorrow ' + mHours.map(hourLabel).join(', '));
      if (t.repeat) {
        if (doneToday) vm.status = { text: 'Done today', cls: 'ok' };
        else if (!tHours.length) vm.status = { text: 'Not planned today', cls: 'warn' };
      }
    }
    return { key: 't:' + t.id, sig: JSON.stringify(vm), build: () => taskRow(vm) };
  }
  function editRow(t, confirm) {
    const d = S.draft;
    return h('li', { class: 'task is-editing', 'data-task': t.id },
      h('form', { class: 'edit', id: 'edit-form', autocomplete: 'off' },
        h('label', { class: 'sr', for: 'edit-title', text: 'Task' }),
        h('input', { type: 'text', id: 'edit-title', maxlength: '200', value: d.title }),
        h('div', { class: 'add-row' },
          h('label', { class: 'field', for: 'edit-deadline' }, 'Deadline ', h('input', { type: 'date', id: 'edit-deadline', value: d.deadline })),
          h('button', { type: 'button', class: 'btn small ghost', id: 'edit-nodate', text: 'Clear date' }),
          h('label', { class: 'check', for: 'edit-daily' }, h('input', { type: 'checkbox', id: 'edit-daily', checked: d.repeat }), ' Every day')),
        h('div', { class: 'edit-actions' },
          h('button', { type: 'submit', class: 'btn small primary', id: 'edit-save', text: 'Save' }),
          h('button', { type: 'button', class: 'btn small', id: 'edit-cancel', text: 'Cancel' }),
          t.repeat ? h('button', { type: 'button', class: 'btn small', id: 'edit-finish', text: 'Finish for good' }) : null,
          h('button', { type: 'button', class: 'btn small danger', id: 'edit-delete', text: confirm ? 'Tap again to delete' : 'Delete' }))));
  }

  function blockItem(b, m, where) {
    const t = m.tasks.get(b.taskId);
    const vm = {
      id: b.id, title: t.title, done: effDone(b, t), where: where,
      armed: !!(S.armed && S.armed.kind === 'block' && S.armed.id === b.id)
    };
    return { key: 'b:' + b.id, sig: JSON.stringify(vm), build: () => blockChip(vm) };
  }
  /* Tell the focus view and the tab title what this hour holds. */
  function publish(m) {
    if (!hooks.onNow) return;
    const titleOf = (b) => m.tasks.get(b.taskId).title;
    const here = mode === 'loading' ? [] : m.todayByHour[curHour].map((b) => ({ id: b.id, title: titleOf(b), done: effDone(b, m.tasks.get(b.taskId)) }));
    let next = null;
    for (let hr = curHour + 1; hr < 24 && !next; hr++) {
      for (const b of m.todayByHour[hr]) {
        if (!effDone(b, m.tasks.get(b.taskId))) { next = { hour: hourLabel(hr), title: titleOf(b) }; break; }
      }
    }
    hooks.onNow({ loading: mode === 'loading', canWrite: canWrite(), hour: hourLabel(curHour), minute: curMin, minutesLeft: 60 - curMin, here: here, next: next });
  }

  function captureFocus() {
    const a = document.activeElement;
    if (!a || !a.id) return null;
    let s = null, e = null;
    try { s = a.selectionStart; e = a.selectionEnd; } catch { /* not a text field */ }
    return { id: a.id, s: s, e: e };
  }
  function restoreFocus(k) {
    if (!k) return;
    const el = $(k.id);
    if (!el || el === document.activeElement) return;
    el.focus({ preventScroll: true });
    if (k.s !== null && k.s !== undefined) { try { el.setSelectionRange(k.s, k.e); } catch { /* ignore */ } }
  }

  function renderClock() {
    $('today-label').textContent = dayDate(today);
    $('now-hour').textContent = hourLabel(curHour);
    $('now-left').textContent = (60 - curMin) + ' min left';
  }

  function render() {
    const keep = captureFocus();
    const m = model();

    if (S.armed) {
      const ok = S.armed.kind === 'task' ? m.tasks.has(S.armed.id) : m.blocks.has(S.armed.id);
      if (!ok) S.armed = null;
    }
    if (S.editing && !m.tasks.has(S.editing)) { S.editing = null; S.draft = null; }

    /* ---- chrome ---- */
    document.body.dataset.tab = S.tab;
    document.body.classList.toggle('is-armed', !!S.armed);
    renderClock();
    const sync = $('sync');
    let st = ['ok', 'Saved'];
    if (mode === 'local') st = ['off', 'Not saving'];
    else if (mode === 'dead') st = ['off', 'Disconnected'];
    else if (mode === 'loading') st = ['busy', 'Loading'];
    else if (pendingCount > 0) st = ['busy', 'Saving'];
    else if (stale) st = ['busy', 'Offline copy'];
    sync.dataset.state = st[0];
    if (sync.textContent !== st[1]) sync.textContent = st[1];

    const notice = $('notice');
    let msg = '';
    if (mode === 'local') msg = 'Changes are not being saved right now. Reload the page and sign in again.';
    else if (mode === 'dead') msg = 'Lost the connection to your saved list. Reload the page to try again.';
    else if (slow && mode === 'live') msg = 'Showing the copy saved on this device. It may be out of date until the connection is back.';
    notice.hidden = !msg;
    if (notice.textContent !== msg) notice.textContent = msg;

    $('main').inert = mode === 'loading' || mode === 'dead';
    $('tab-list').setAttribute('aria-pressed', String(S.tab === 'list'));
    $('tab-hours').setAttribute('aria-pressed', String(S.tab === 'hours'));
    $('view-today').setAttribute('aria-pressed', String(S.view === 'today'));
    $('view-tomorrow').setAttribute('aria-pressed', String(S.view === 'tomorrow'));
    $('view-today-date').textContent = dayDate(today);
    $('view-tomorrow-date').textContent = dayDate(tomorrow);

    const armEl = $('arm');
    armEl.hidden = !S.armed;
    if (S.armed) {
      const dayWord = S.view === 'today' ? 'today' : 'tomorrow';
      let title = '';
      if (S.armed.kind === 'task') title = m.tasks.get(S.armed.id).title;
      else { const b = m.blocks.get(S.armed.id); const t = m.tasks.get(b.taskId); title = t ? t.title : ''; }
      $('arm-lead').textContent = (S.armed.kind === 'task' ? 'Tap an hour ' : 'Tap a new hour ') + dayWord + ' for';
      $('arm-title').textContent = title;
    }

    /* ---- now bar ---- */
    const nowItems = [];
    if (mode === 'loading') {
      nowItems.push({ key: 'x:load', sig: '1', build: () => h('span', { class: 'now-empty', text: 'Loading…' }) });
    } else {
      const here = m.todayByHour[curHour];
      if (here.length) {
        for (const b of here) nowItems.push(blockItem(b, m, 'now'));
      } else {
        let next = null;
        for (let hr = curHour + 1; hr < 24 && !next; hr++) {
          for (const b of m.todayByHour[hr]) { if (!effDone(b, m.tasks.get(b.taskId))) { next = b; break; } }
        }
        nowItems.push({ key: 'x:none', sig: '1', build: () => h('span', { class: 'now-empty', text: 'Nothing planned for this hour.' }) });
        if (next) {
          const text = 'Next: ' + hourLabel(next.hour) + ', ' + m.tasks.get(next.taskId).title;
          nowItems.push({ key: 'x:next', sig: text, build: () => h('span', { class: 'now-next', text: text }) });
        }
        nowItems.push({ key: 'x:plan', sig: '1', build: () => h('button', { type: 'button', class: 'btn small', id: 'now-plan', text: 'Plan this hour' }) });
      }
    }
    reconcile($('now-items'), nowItems);

    /* ---- list ---- */
    const open = m.daily.length + m.dated.length + m.undated.length;
    $('open-count').textContent = mode === 'loading' ? '' : open + ' open';
    const state = $('list-state');
    let stateMsg = '';
    if (mode === 'loading') stateMsg = slow ? 'Cannot reach your saved list yet. It will show up when the connection is back.' : 'Loading your list…';
    else if (mode === 'dead' && !m.tasks.size) stateMsg = 'Your list could not be loaded.';
    else if (!m.tasks.size) stateMsg = 'Nothing here yet. Add the first thing you need to do.';
    else if (!open) stateMsg = 'Everything is done. Add the next thing you need to do.';
    state.hidden = !stateMsg;
    if (state.textContent !== stateMsg) state.textContent = stateMsg;
    const sections = [['daily', m.daily], ['dated', m.dated], ['undated', m.undated], ['done', m.done]];
    for (const pair of sections) {
      $('sec-' + pair[0]).hidden = !pair[1].length;
      reconcile($('ul-' + pair[0]), pair[1].map((t) => taskItem(t, m)));
    }
    $('done-summary').textContent = 'Done · ' + m.done.length;

    /* ---- hours ---- */
    const isToday = S.view === 'today';
    const lists = isToday ? m.todayByHour : m.tomByHour;
    for (let hr = 0; hr < 24; hr++) {
      const r = hourRows[hr];
      r.row.classList.toggle('is-past', isToday && hr < curHour);
      r.row.classList.toggle('is-now', isToday && hr === curHour);
      r.nowTag.hidden = !(isToday && hr === curHour);
      reconcile(r.blocks, lists[hr].map((b) => blockItem(b, m, 'hours')));
    }

    /* ---- picker ---- */
    if (S.pick) {
      const p = S.pick;
      $('pick-h').textContent = 'Add to ' + hourLabel(p.hour) + ', ' + (p.date === today ? 'today' : p.date === tomorrow ? 'tomorrow' : shortDate(p.date));
      const ul = $('pick-list');
      const kids = [];
      const openTasks = m.daily.concat(m.dated, m.undated);
      for (const t of openTasks) {
        let here = false;
        for (const b of (m.byTask.get(t.id) || [])) { if (b.date === p.date && b.hour === p.hour) here = true; }
        const due = dueInfo(t);
        const side = here ? 'Already here' : (t.repeat ? 'Every day' : (due && due.cls !== 'none' ? due.text : ''));
        kids.push(h('li', null, h('button', { type: 'button', class: 'pick-item', 'data-task': t.id, disabled: here },
          h('span', { text: t.title }), side ? h('small', { text: side }) : null)));
      }
      if (!kids.length) kids.push(h('li', { class: 'pick-empty', text: 'Your list is empty. Type a task below to add it here.' }));
      ul.replaceChildren.apply(ul, kids);
    }

    publish(m);

    restoreFocus(keep);
    if (S.focusNext) {
      const el = $(S.focusNext);
      S.focusNext = null;
      if (el) { el.focus(); if (el.select && el.type === 'text') el.select(); }
    }
    if (S.scrollToNow && mode !== 'loading') {
      const body = $('hours-body');
      if (body.offsetParent !== null) {
        S.scrollToNow = false;
        if (S.view === 'today') body.scrollTop = Math.max(0, hourRows[curHour].row.offsetTop - hourRows[curHour].row.offsetHeight);
      }
    }
  }

  /* ================= events ================= */
  function taskIdOf(el) { const row = el.closest('[data-task]'); return row ? row.dataset.task : null; }
  function blockIdOf(el) { const chip = el.closest('[data-block]'); return chip ? chip.dataset.block : null; }

  $('add-form').addEventListener('submit', (e) => {
    e.preventDefault();
    if (!canWrite()) return;
    const title = $('new-title').value.trim();
    if (!title) { $('new-title').focus(); return; }
    addTask(title, $('new-deadline').value, $('new-daily').checked);
    $('new-title').value = '';
    $('new-deadline').value = '';
    $('new-daily').checked = false;
    $('new-title').focus();
  });

  const listBody = $('list-body');
  listBody.addEventListener('click', (e) => {
    const btn = e.target.closest('button');
    if (!btn || !canWrite()) return;
    const id = taskIdOf(btn);
    if (btn.classList.contains('act-plan')) arm('task', id);
    else if (btn.classList.contains('act-edit')) startEdit(id, 'edit-title');
    else if (btn.classList.contains('act-date')) startEdit(id, 'edit-deadline');
    else if (btn.classList.contains('act-del')) askDelete(id);
    else if (btn.id === 'edit-cancel') stopEdit();
    else if (btn.id === 'edit-delete') askDelete(id);
    else if (btn.id === 'edit-nodate') { if (S.draft) S.draft.deadline = ''; $('edit-deadline').value = ''; }
    else if (btn.id === 'edit-finish') {
      const t = cur('tasks', id);
      if (t) put('tasks', id, Object.assign({}, t, { repeat: false, done: true, doneAt: Date.now() }));
      stopEdit();
    }
  });
  listBody.addEventListener('change', (e) => {
    const el = e.target;
    if (el.id === 'edit-daily') { if (S.draft) S.draft.repeat = el.checked; return; }
    if (el.id === 'edit-deadline') { if (S.draft) S.draft.deadline = el.value; return; }
    if (el.type === 'checkbox' && el.id.indexOf('tchk-') === 0) {
      if (canWrite()) toggleTask(taskIdOf(el));
      schedule();
    }
  });
  listBody.addEventListener('input', (e) => {
    if (!S.draft) return;
    if (e.target.id === 'edit-title') S.draft.title = e.target.value;
    else if (e.target.id === 'edit-deadline') S.draft.deadline = e.target.value;
  });
  listBody.addEventListener('submit', (e) => {
    if (e.target.id === 'edit-form') { e.preventDefault(); if (canWrite()) saveEdit(); }
  });

  /* drag from the list, or between hours */
  let drag = null;
  document.addEventListener('dragstart', (e) => {
    const el = e.target && e.target.closest ? e.target.closest('[draggable="true"]') : null;
    if (!el || !canWrite()) return;
    if (el.dataset.task) drag = { kind: 'task', id: el.dataset.task };
    else if (el.dataset.block) drag = { kind: 'block', id: el.dataset.block };
    else return;
    try { e.dataTransfer.setData('text/plain', drag.kind + ':' + drag.id); e.dataTransfer.effectAllowed = 'copyMove'; } catch { /* ignore */ }
  });
  document.addEventListener('dragend', () => { drag = null; clearOver(); });
  function clearOver() { for (const r of hourRows) r.row.classList.remove('is-over'); }

  const hoursEl = $('hours');
  hoursEl.addEventListener('dragover', (e) => {
    const row = e.target.closest('.hour');
    if (!row || !drag) return;
    e.preventDefault();
    try { e.dataTransfer.dropEffect = drag.kind === 'task' ? 'copy' : 'move'; } catch { /* ignore */ }
    if (!row.classList.contains('is-over')) { clearOver(); row.classList.add('is-over'); }
  });
  hoursEl.addEventListener('dragleave', (e) => {
    if (!hoursEl.contains(e.relatedTarget)) clearOver();
  });
  hoursEl.addEventListener('drop', (e) => {
    const row = e.target.closest('.hour');
    if (!row || !drag) return;
    e.preventDefault();
    const d = drag, hour = +row.dataset.hour;
    drag = null;
    clearOver();
    if (d.kind === 'task') { if (cur('tasks', d.id)) addBlock(d.id, viewDate(), hour); }
    else moveBlock(d.id, viewDate(), hour);
    S.armed = null;
    schedule();
  });
  hoursEl.addEventListener('click', (e) => {
    if (!canWrite()) return;
    const row = e.target.closest('.hour');
    if (!row) return;
    const hour = +row.dataset.hour;
    if (e.target.closest('.block-x')) { removeBlock(blockIdOf(e.target)); schedule(); return; }
    if (e.target.matches('input[type="checkbox"]')) return;
    if (S.armed) { placeArmed(hour); return; }
    if (e.target.closest('.block-title')) { arm('block', blockIdOf(e.target)); return; }
    openPicker(viewDate(), hour);
  });
  hoursEl.addEventListener('keydown', (e) => {
    if ((e.key === 'Enter' || e.key === ' ') && e.target.getAttribute('role') === 'button' && canWrite()) {
      e.preventDefault();
      if (S.armed) placeArmed(+e.target.closest('.hour').dataset.hour);
      else arm('block', blockIdOf(e.target));
    }
  });
  hoursEl.addEventListener('change', (e) => {
    if (e.target.type === 'checkbox') { if (canWrite()) toggleBlock(blockIdOf(e.target)); schedule(); }
  });

  $('now-items').addEventListener('change', (e) => {
    if (e.target.type === 'checkbox') { if (canWrite()) toggleBlock(blockIdOf(e.target)); schedule(); }
  });
  $('now-items').addEventListener('click', (e) => {
    if (e.target.id === 'now-plan' && canWrite()) {
      S.view = 'today';
      openPicker(today, curHour);
    }
  });

  $('view-today').addEventListener('click', () => setView('today'));
  $('view-tomorrow').addEventListener('click', () => setView('tomorrow'));
  $('tab-list').addEventListener('click', () => setTab('list'));
  $('tab-hours').addEventListener('click', () => setTab('hours'));
  $('arm-cancel').addEventListener('click', () => { S.armed = null; schedule(); });
  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape' || $('picker').open) return;
    if (S.armed) { S.armed = null; schedule(); }
    else if (S.editing) stopEdit();
  });

  /* picker */
  const dlg = $('picker');
  function openPicker(date, hour) {
    S.pick = { date: date, hour: hour };
    render();
    if (!dlg.open) {
      if (typeof dlg.showModal === 'function') dlg.showModal(); else dlg.setAttribute('open', '');
    }
  }
  function closePicker() {
    if (dlg.open) { if (typeof dlg.close === 'function') dlg.close(); else dlg.removeAttribute('open'); }
    S.pick = null;
    $('pick-title').value = '';
  }
  dlg.addEventListener('close', () => { S.pick = null; $('pick-title').value = ''; });
  dlg.addEventListener('click', (e) => {
    if (e.target === dlg) { closePicker(); return; }
    const item = e.target.closest('.pick-item');
    if (item && !item.disabled && S.pick && canWrite()) {
      const p = S.pick;
      addBlock(item.dataset.task, p.date, p.hour);
      closePicker();
      schedule();
    }
  });
  $('pick-close').addEventListener('click', closePicker);
  $('pick-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const title = $('pick-title').value.trim();
    if (!title || !S.pick || !canWrite()) { $('pick-title').focus(); return; }
    const p = S.pick;
    const id = addTask(title, '', false);
    addBlock(id, p.date, p.hour);
    closePicker();
    schedule();
  });

  /* ================= clock tick ================= */
  function tick() {
    const n = new Date();
    const t = ymd(n), hr = n.getHours(), mn = n.getMinutes();
    const dayChanged = t !== today, hourChanged = hr !== curHour, minChanged = mn !== curMin;
    now = n; today = t; tomorrow = addDays(t, 1); curHour = hr; curMin = mn;
    if (dayChanged) { S.view = 'today'; S.scrollToNow = true; }
    /* publish directly as well: a background tab pauses the redraw, and the tab title must still move on */
    if (dayChanged || hourChanged) { schedule(); publish(model()); }
    else if (minChanged) { renderClock(); publish(model()); }
  }

  /* ================= start ================= */
  function start() {
    buildHours();
    render();
    setInterval(tick, 15000);
    document.addEventListener('visibilitychange', () => { if (!document.hidden) tick(); });

    if (!store) { mode = 'local'; schedule(); return; }
    db = store;

    const got = { tasks: false, blocks: false };
    const fresh = { tasks: false, blocks: false };
    const timer = setTimeout(() => { slow = true; schedule(); }, 10000);
    let staleTimer = 0;
    const failed = () => { clearTimeout(timer); clearTimeout(staleTimer); slow = false; mode = 'dead'; schedule(); };
    const isFresh = () => fresh.tasks && (fresh.blocks || !got.blocks);
    const listen = (coll, norm) => {
      db.collection(coll).onSnapshot((snap) => {
        const mp = new Map();
        for (const d of snap.docs) {
          if (d.exists === false) continue;
          const body = d.data();
          if (body) mp.set(d.id, norm(d.id, body));
        }
        base[coll] = mp;
        got[coll] = true;
        fresh[coll] = !(snap.metadata && snap.metadata.fromCache);
        if (got.tasks && mode === 'loading') mode = 'live';
        if (isFresh()) {
          clearTimeout(timer); clearTimeout(staleTimer);
          staleTimer = 0; slow = false; stale = false;
        } else if (!staleTimer && !stale) {
          /* a cached view that lasts is worth a label; a brief one is not */
          staleTimer = setTimeout(() => { staleTimer = 0; stale = !isFresh(); schedule(); }, 4000);
        }
        schedule();
      }, failed);
    };
    try { listen('tasks', normTask); listen('blocks', normBlock); } catch { failed(); }
  }
  start();

  return {
    /** Tick or untick a planned hour from outside the plan, such as the focus view. */
    toggleBlock: (id) => { if (canWrite()) { toggleBlock(id); schedule(); } },
    /** Open the task picker for the current hour. */
    planThisHour: () => { if (canWrite()) { S.view = 'today'; openPicker(today, curHour); } },
    /** Redraw the plan, for when it comes back into view. */
    refresh: () => { if (S.view === 'today') S.scrollToNow = true; schedule(); },
  };
}
