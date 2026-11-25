/* Record helpers for the Deep Work planner, moved out of the planner unchanged:
   tidy what the store returns, and sort tasks by age or by deadline. */
import { isYmd } from './dom.js';

export function normTask(id, d) {
  return Object.assign({}, d, {
    id: id,
    title: typeof d.title === 'string' && d.title.trim() ? d.title : 'Untitled',
    deadline: isYmd(d.deadline) ? d.deadline : '',
    repeat: d.repeat === true,
    done: d.done === true,
    doneAt: Number.isFinite(d.doneAt) ? d.doneAt : 0,
    lastDone: isYmd(d.lastDone) ? d.lastDone : '',
    createdAt: Number.isFinite(d.createdAt) ? d.createdAt : 0
  });
}
export function normBlock(id, d) {
  return Object.assign({}, d, {
    id: id,
    taskId: typeof d.taskId === 'string' ? d.taskId : '',
    date: isYmd(d.date) ? d.date : '',
    hour: Number.isInteger(d.hour) && d.hour >= 0 && d.hour <= 23 ? d.hour : -1,
    done: d.done === true,
    createdAt: Number.isFinite(d.createdAt) ? d.createdAt : 0
  });
}
export function toBody(v) {
  const out = {};
  for (const k of Object.keys(v)) { if (k !== 'id' && v[k] !== undefined) out[k] = v[k]; }
  return out;
}

export const byAge = (a, b) => (a.createdAt - b.createdAt) || (a.id < b.id ? -1 : 1);
export const byDue = (a, b) => {
  const x = a.deadline || '9999-99-99', y = b.deadline || '9999-99-99';
  return x < y ? -1 : x > y ? 1 : byAge(a, b);
};
