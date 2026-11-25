import './deepwork.css';
import { changePassword, getSession, signIn, signOut } from './api.js';
import { $ } from './dom.js';
import { createFocusView } from './focus.js';
import { showSignIn } from './login.js';
import { setupPasswordChange } from './password.js';
import { startPlanner } from './planner.js';
import { createStore } from './store.js';

const APP_TITLE = 'Deep Work';
const SCREEN_KEY = 'deepwork.screen';
const SIGNED_OUT_KEY = 'deepwork.signedOut';
const TOAST_MS = 5000;
const BOOT_RETRY_MS = 5000;

/* Browser storage is a convenience only; the page works the same without it. */
const remember = (storage, key, value) => {
  try { storage.setItem(key, value); } catch { /* optional */ }
};
const recall = (storage, key) => {
  try { return storage.getItem(key); } catch { return null; }
};
const forget = (storage, key) => {
  try { storage.removeItem(key); } catch { /* optional */ }
};

let toastTimer = 0;
function showToast(message) {
  const toast = $('toast');
  toast.textContent = message;
  toast.hidden = false;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => { toast.hidden = true; }, TOAST_MS);
}

/** The tab shows the task in hand, so a glance at the tab bar is enough to stay on it. */
const tabTitle = (task, minutesLeft) => (task ? `${task.title} · ${minutesLeft} min left | ${APP_TITLE}` : APP_TITLE);

function openApp() {
  let planner = null;
  let hasSignedOut = false;

  const handleSignedOut = () => {
    if (hasSignedOut) return;
    hasSignedOut = true;
    remember(sessionStorage, SIGNED_OUT_KEY, '1');
    location.reload();
  };

  /** Swap between the plan and the focus view, keeping the keyboard on the screen now showing. */
  const showScreen = (name, { moveFocus = true } = {}) => {
    $('app').hidden = name !== 'plan';
    $('focus').hidden = name !== 'focus';
    remember(localStorage, SCREEN_KEY, name);
    if (name === 'plan' && planner) planner.refresh();
    if (moveFocus) $(name === 'focus' ? 'focus-title' : 'focus-open').focus();
  };

  const focus = createFocusView({
    onToggle: (blockId) => planner.toggleBlock(blockId),
    onPlan: () => {
      showScreen('plan');
      planner.planThisHour();
    },
  });

  const store = createStore({ onSignedOut: handleSignedOut });
  planner = startPlanner(store, {
    onSignedOut: handleSignedOut,
    onNow: (now) => {
      document.title = tabTitle(focus.update(now), now.minutesLeft);
    },
  });

  $('focus-open').addEventListener('click', () => showScreen('focus'));
  $('focus-exit').addEventListener('click', () => showScreen('plan'));
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !$('focus').hidden) showScreen('plan');
  });
  setupPasswordChange({
    changePassword,
    onChanged: () => showToast('Password changed. Other devices are signed out.'),
  });
  $('signout').addEventListener('click', async () => {
    if (store.hasPendingWrites()) {
      showToast('Still saving. Try again in a moment.');
      return;
    }
    hasSignedOut = true; // this sign-out was chosen, so skip the "you were signed out" note
    try {
      await signOut();
      location.reload();
    } catch (failure) {
      hasSignedOut = false;
      showToast(failure.message);
    }
  });

  const startsInFocus = recall(localStorage, SCREEN_KEY) === 'focus';
  showScreen(startsInFocus ? 'focus' : 'plan', { moveFocus: startsInFocus });
}

async function boot() {
  const status = $('boot');
  let session;
  try {
    session = await getSession();
  } catch (failure) {
    status.textContent = failure.message;
    if (failure.code === 'unavailable') setTimeout(boot, BOOT_RETRY_MS); // keep trying until the connection is back
    return;
  }
  status.hidden = true;
  if (session.signedIn) {
    openApp();
    return;
  }
  const wasSignedOut = recall(sessionStorage, SIGNED_OUT_KEY) === '1';
  forget(sessionStorage, SIGNED_OUT_KEY);
  showSignIn({ signIn, onSignedIn: openApp, notice: wasSignedOut ? 'You were signed out. Sign in again.' : '' });
}

boot();
