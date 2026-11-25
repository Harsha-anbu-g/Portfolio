import { handleData } from '../../server/deepwork/runtime.js';

/** /api/deepwork/data: GET returns every task and planned hour for the signed-in user. */
export default { fetch: handleData };
