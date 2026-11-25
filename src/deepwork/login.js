import { $ } from './dom.js';

const IDLE_LABEL = 'Sign in';
const BUSY_LABEL = 'Signing in…';

/**
 * Show the sign-in form and call `onSignedIn` once the user ID and password are accepted.
 * @param {{ signIn: (userId: string, password: string) => Promise<unknown>, onSignedIn: () => void, notice?: string }} options
 */
export function showSignIn({ signIn, onSignedIn, notice = '' }) {
  const error = $('signin-error');
  const button = $('signin-submit');
  const userField = $('signin-user');
  const passwordField = $('signin-password');

  const showMessage = (message) => {
    error.textContent = message;
    error.hidden = !message;
  };
  const setBusy = (isBusy) => {
    button.disabled = isBusy;
    button.textContent = isBusy ? BUSY_LABEL : IDLE_LABEL;
  };

  showMessage(notice);
  $('signin').hidden = false;
  userField.focus();

  $('signin-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    const userId = userField.value.trim();
    const password = passwordField.value;
    if (!userId || !password) {
      showMessage('Enter your user ID and password.');
      (userId ? passwordField : userField).focus();
      return;
    }
    setBusy(true);
    showMessage('');
    try {
      await signIn(userId, password);
    } catch (failure) {
      showMessage(failure.message || 'Could not sign in. Try again.');
      setBusy(false);
      passwordField.focus();
      passwordField.select();
      return;
    }
    /* Outside the try: a fault while opening the planner must not be shown as a sign-in error. */
    passwordField.value = '';
    $('signin').hidden = true;
    onSignedIn();
  });
}
