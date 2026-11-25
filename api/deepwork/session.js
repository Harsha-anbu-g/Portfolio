import { handleSession } from '../../server/deepwork/runtime.js';

/** /api/deepwork/session: GET says whether you are signed in, POST signs in, DELETE signs out. */
export default { fetch: handleSession };
