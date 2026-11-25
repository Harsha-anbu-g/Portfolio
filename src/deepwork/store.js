/* The planner was built against a document store with two calls: doc(path).set/delete and
   collection(name).onSnapshot. This adapter gives it that same shape on top of the Deep Work API,
   so the planner's own code did not have to change. Other devices are picked up by checking
   the saved list every few seconds while the page is visible. */
import { deleteBlock, deleteTask, getPlannerData, saveBlock, saveTask } from './api.js';

const POLL_MS = 20000;
const RETRY_MS = 4000;
const RECHECK_MS = 500;
const OFFLINE_AFTER_FAILURES = 2;
const NAMES = ['tasks', 'blocks'];

const WRITERS = {
  tasks: { save: saveTask, remove: deleteTask },
  blocks: { save: saveBlock, remove: deleteBlock },
};

/**
 * @param {{ onSignedOut?: () => void }} [options]
 * @returns {{
 *   doc: (path: string) => { set: Function, delete: Function },
 *   collection: (name: string) => { onSnapshot: Function },
 *   hasPendingWrites: () => boolean,
 *   stop: () => void,
 * }}
 */
export function createStore({ onSignedOut } = {}) {
  const listeners = { tasks: [], blocks: [] };
  /* What the server is known to hold: the last load, plus every save confirmed since. */
  let known = { tasks: new Map(), blocks: new Map() };
  let writeEpoch = 0;
  let writesInFlight = 0;
  let failures = 0;
  let timer = 0;
  let isLoading = false;
  let hasLoaded = false;
  let isStopped = false;

  const emit = (fromCache) => {
    for (const name of NAMES) {
      const docs = Array.from(known[name], ([id, body]) => ({ id, exists: true, data: () => body }));
      listeners[name].forEach((listener) => listener({ docs, metadata: { fromCache } }));
    }
  };

  const schedule = (ms) => {
    clearTimeout(timer);
    if (!isStopped) timer = setTimeout(refresh, ms);
  };

  function stop() {
    isStopped = true;
    clearTimeout(timer);
    document.removeEventListener('visibilitychange', refreshIfVisible);
    window.removeEventListener('online', refreshIfVisible);
  }

  function handleLoadFailure(error) {
    if (error.code === 'signed_out') {
      stop();
      if (onSignedOut) onSignedOut();
      return;
    }
    failures += 1;
    /* Tell the planner its copy may be out of date, so it stops saying everything is saved. */
    if (hasLoaded && failures === OFFLINE_AFTER_FAILURES) emit(true);
    schedule(RETRY_MS);
  }

  async function refresh() {
    if (isStopped || isLoading) return;
    if (document.hidden && hasLoaded) { schedule(POLL_MS); return; }
    isLoading = true;
    const epochAtStart = writeEpoch;
    let data = null;
    let failure = null;
    try {
      data = await getPlannerData();
    } catch (error) {
      failure = error;
    } finally {
      isLoading = false;
    }
    if (isStopped) return;
    if (failure) { handleLoadFailure(failure); return; }
    failures = 0;
    /* A save that started or finished while this load was in the air makes the load out of date. */
    if (epochAtStart !== writeEpoch) { schedule(RECHECK_MS); return; }
    hasLoaded = true;
    known = Object.fromEntries(NAMES.map((name) => [name, new Map((data[name] || []).map(({ id, ...body }) => [id, body]))]));
    emit(false);
    schedule(POLL_MS);
  }

  function refreshIfVisible() {
    if (!document.hidden) schedule(0);
  }

  /** Run one save, then note the confirmed result so an offline snapshot never rolls it back. */
  async function write(collection, id, run, body) {
    writeEpoch += 1;
    writesInFlight += 1;
    try {
      const result = await run();
      const next = new Map(known[collection]);
      if (body === undefined) next.delete(id); else next.set(id, body);
      known = { ...known, [collection]: next };
      return result;
    } finally {
      writesInFlight -= 1;
      writeEpoch += 1;
    }
  }

  document.addEventListener('visibilitychange', refreshIfVisible);
  window.addEventListener('online', refreshIfVisible);

  return {
    doc(path) {
      const [collection, id] = path.split('/');
      return {
        set: (body) => write(collection, id, () => WRITERS[collection].save(id, body), body),
        delete: () => write(collection, id, () => WRITERS[collection].remove(id)),
      };
    },
    collection(name) {
      return {
        onSnapshot(listener) {
          listeners[name].push(listener);
          schedule(0);
        },
      };
    },
    /** True while a save is still on its way to the server. */
    hasPendingWrites: () => writesInFlight > 0,
    stop,
  };
}
