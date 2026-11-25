import { handlePassword } from '../../server/deepwork/runtime.js';

/** /api/deepwork/password: PUT changes the password, given the current one. */
export default { fetch: handlePassword };
