import { $ } from './dom.js';

const setText = (element, text) => {
  if (element.textContent !== text) element.textContent = text;
};

/** Work out the headline and the line under it from what this hour holds. */
function describe(now, open) {
  if (now.loading) return { title: 'Loading…', note: '' };
  if (open.length) {
    const more = open.length > 2 ? `, and ${open.length - 2} more` : '';
    return { title: open[0].title, note: open.length > 1 ? `Then: ${open[1].title}${more}` : '' };
  }
  if (now.here.length) return { title: 'Done for this hour.', note: '' };
  return { title: 'Nothing planned for this hour.', note: '' };
}

/**
 * The focus view: only this hour's task, the minutes left, and one Done button.
 * @param {{ onToggle: (blockId: string) => void, onPlan: () => void }} actions
 * @returns {{ update: (now: object) => ({ id: string, title: string } | null) }}
 */
export function createFocusView({ onToggle, onPlan }) {
  let current = null;
  let lastDoneId = null;
  /* True from a tap on Done or Undo until the planner reports back, so a double tap cannot undo itself. */
  let isWaiting = false;

  const act = (blockId) => {
    isWaiting = true;
    onToggle(blockId);
    $('focus-title').focus(); // the tapped button is about to hide; keep the keyboard on this screen
  };

  $('focus-done').addEventListener('click', () => {
    if (!current || isWaiting) return;
    lastDoneId = current.id;
    act(current.id);
  });
  $('focus-undo').addEventListener('click', () => {
    if (lastDoneId && !isWaiting) act(lastDoneId);
  });
  $('focus-plan').addEventListener('click', onPlan);

  return {
    /** Redraw from what the planner says this hour holds. Returns the task in focus, if any. */
    update(now) {
      const open = now.here.filter((block) => !block.done);
      const { title, note } = describe(now, open);
      const canUndo = Boolean(lastDoneId) && now.here.some((block) => block.id === lastDoneId && block.done);
      if (!canUndo) lastDoneId = null; // undone, or the hour moved on
      isWaiting = false;
      current = now.loading ? null : open[0] || null;

      setText($('focus-hour'), now.hour);
      setText($('focus-left'), `${now.minutesLeft} min left`);
      setText($('focus-title'), title);
      setText($('focus-note'), note);
      setText($('focus-next'), now.next ? `Next: ${now.next.hour}, ${now.next.title}` : '');
      $('focus-note').hidden = !note;
      $('focus-next').hidden = !now.next;
      $('focus-progress').value = now.minute;

      $('focus-done').hidden = !current;
      $('focus-done').disabled = !now.canWrite;
      $('focus-undo').hidden = !canUndo;
      $('focus-plan').hidden = now.loading || now.here.length > 0;
      $('focus-plan').disabled = !now.canWrite;
      return current;
    },
  };
}
