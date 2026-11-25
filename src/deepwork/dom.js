/* Date and element helpers for the Deep Work planner, moved out of the planner unchanged. */
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
export const $ = (id) => document.getElementById(id);
export const pad = (n) => String(n).padStart(2, '0');
export const ymd = (d) => d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate());
export const isYmd = (s) => typeof s === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(s);
export const fromYmd = (s) => { const p = s.split('-'); return new Date(+p[0], +p[1] - 1, +p[2]); };
export const addDays = (s, n) => { const d = fromYmd(s); d.setDate(d.getDate() + n); return ymd(d); };
export const dayDiff = (a, b) => Math.round((fromYmd(a) - fromYmd(b)) / 86400000);
export const hourLabel = (h) => (h % 12 === 0 ? 12 : h % 12) + ' ' + (h < 12 ? 'AM' : 'PM');
export const shortDate = (s) => { const d = fromYmd(s); return MONTHS[d.getMonth()] + ' ' + d.getDate(); };
export const dayDate = (s) => { const d = fromYmd(s); return DAYS[d.getDay()] + ', ' + MONTHS[d.getMonth()] + ' ' + d.getDate(); };
export const newId = (p) => p + Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
export const isPhone = () => window.matchMedia('(max-width: 760px)').matches;

export function h(tag, attrs) {
  const el = document.createElement(tag);
  if (attrs) {
    for (const k of Object.keys(attrs)) {
      const v = attrs[k];
      if (v === null || v === undefined || v === false) continue;
      if (k === 'text') el.textContent = v;
      else if (k === 'class') el.className = v;
      else if (k === 'checked' || k === 'disabled' || k === 'draggable' || k === 'hidden' || k === 'value') el[k] = v;
      else el.setAttribute(k, v === true ? '' : String(v));
    }
  }
  for (let i = 2; i < arguments.length; i++) put1(el, arguments[i]);
  return el;
}
function put1(el, kid) {
  if (kid === null || kid === undefined || kid === false) return;
  if (Array.isArray(kid)) { kid.forEach((k) => put1(el, k)); return; }
  el.append(kid.nodeType ? kid : document.createTextNode(String(kid)));
}

/* Keyed update: keeps a row's element when nothing about it changed,
   so focus, open date pickers and drags survive a refresh. */
export function reconcile(parent, items) {
  const old = new Map();
  for (const el of Array.from(parent.children)) {
    if (el.dataset && el.dataset.key !== undefined) old.set(el.dataset.key, el); else el.remove();
  }
  let cursor = parent.firstElementChild;
  for (const it of items) {
    let el = old.get(it.key);
    if (el) old.delete(it.key);
    if (!el || el.dataset.sig !== it.sig) {
      const fresh = it.build();
      fresh.dataset.key = it.key;
      fresh.dataset.sig = it.sig;
      if (el) { if (cursor === el) cursor = el.nextElementSibling; el.remove(); }
      el = fresh;
    }
    if (el === cursor) cursor = cursor.nextElementSibling;
    else parent.insertBefore(el, cursor);
  }
  for (const el of old.values()) el.remove();
}
