/* Row builders for the Deep Work planner, moved out of the planner unchanged:
   one task row for the list, one task chip for an hour box. */
import { h } from './dom.js';

export function taskRow(vm) {
  const meta = h('div', { class: 'task-meta' });
  if (vm.due) {
    if (vm.due.cls === 'none') meta.append(h('button', { type: 'button', class: 'due none act-date', id: 'date-' + vm.id, text: vm.due.text }));
    else meta.append(h('span', { class: 'due ' + vm.due.cls, text: vm.due.text }));
  }
  if (vm.status) meta.append(h('span', { class: 'status ' + vm.status.cls, text: vm.status.text }));
  for (const p of vm.plan) meta.append(h('span', { class: 'plan', text: p }));
  const label = (vm.repeat ? 'Done today: ' : 'Finished: ') + vm.title;
  const actions = vm.finished
    ? h('div', { class: 'task-actions' },
        h('button', { type: 'button', class: 'btn small ghost danger act-del', id: 'del-' + vm.id, text: vm.confirm ? 'Tap again to delete' : 'Delete' }))
    : h('div', { class: 'task-actions' },
        h('button', { type: 'button', class: 'btn small act-plan', id: 'plan-' + vm.id, text: vm.armed ? 'Cancel' : 'Plan' }),
        h('button', { type: 'button', class: 'btn small ghost act-edit', id: 'edit-' + vm.id, text: 'Edit' }));
  return h('li', {
    class: 'task' + (vm.armed ? ' is-armed' : '') + (vm.checked ? ' is-done' : ''),
    'data-task': vm.id, draggable: !vm.finished
  },
    h('input', { type: 'checkbox', id: 'tchk-' + vm.id, checked: vm.checked, 'aria-label': label }),
    h('div', { class: 'task-main' }, h('div', { class: 'task-title', text: vm.title }), meta),
    actions);
}

export function blockChip(vm) {
  const inNow = vm.where === 'now';
  const pre = inNow ? 'n' : 'b';
  return h('div', { class: 'block' + (vm.done ? ' is-done' : '') + (vm.armed ? ' is-armed' : ''), 'data-block': vm.id, draggable: !inNow },
    h('input', { type: 'checkbox', id: pre + 'chk-' + vm.id, checked: vm.done, 'aria-label': 'Done: ' + vm.title }),
    inNow
      ? h('span', { class: 'block-title', text: vm.title })
      : h('span', { class: 'block-title', id: 'bmove-' + vm.id, role: 'button', tabindex: '0', title: 'Move to another hour', text: vm.title }),
    inNow ? null : h('button', { type: 'button', class: 'block-x', id: 'bx-' + vm.id, 'aria-label': 'Remove from this hour: ' + vm.title, text: '×' }));
}
