import { $ } from './dom.js';

const MIN_LENGTH = 12; // the server is the judge; this only saves a round trip
const SAVE_LABEL = 'Change password';
const BUSY_LABEL = 'Changing…';
const FIELD_IDS = ['password-current', 'password-new', 'password-confirm'];

/**
 * Wire up the Change password button and its dialog.
 * @param {{ changePassword: (current: string, next: string) => Promise<unknown>, onChanged: () => void }} options
 */
export function setupPasswordChange({ changePassword, onChanged }) {
  const dialog = $('password-dialog');
  const error = $('password-error');
  const save = $('password-save');

  const showError = (message, fieldId) => {
    error.textContent = message;
    error.hidden = !message;
    if (fieldId) $(fieldId).focus();
  };
  const setBusy = (isBusy) => {
    save.disabled = isBusy;
    save.textContent = isBusy ? BUSY_LABEL : SAVE_LABEL;
  };
  const reset = () => {
    FIELD_IDS.forEach((id) => { $(id).value = ''; });
    showError('');
    setBusy(false);
  };
  const close = () => {
    if (dialog.open) dialog.close();
  };

  $('password-open').addEventListener('click', () => {
    reset();
    dialog.showModal();
    $('password-current').focus();
  });
  $('password-close').addEventListener('click', close);
  $('password-cancel').addEventListener('click', close);
  dialog.addEventListener('close', reset); // also runs on Escape, so no typed password is left behind
  dialog.addEventListener('click', (event) => {
    if (event.target === dialog) close();
  });

  $('password-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    const [current, next, again] = FIELD_IDS.map((id) => $(id).value);
    if (!current) return showError('Enter your current password.', 'password-current');
    if (next.length < MIN_LENGTH) return showError(`The new password must be at least ${MIN_LENGTH} characters.`, 'password-new');
    if (next !== again) return showError('The two new passwords do not match.', 'password-confirm');
    if (next === current) return showError('Choose a password different from the current one.', 'password-new');
    setBusy(true);
    showError('');
    try {
      await changePassword(current, next);
    } catch (failure) {
      setBusy(false);
      return showError(failure.message || 'Could not change the password. Try again.', failure.code === 'wrong_password' ? 'password-current' : null);
    }
    close();
    onChanged();
  });
}
