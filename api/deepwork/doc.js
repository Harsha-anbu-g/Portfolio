import { handleDoc } from '../../server/deepwork/runtime.js';

/** /api/deepwork/doc?coll=tasks|blocks&id=...: PUT saves one item, DELETE removes one. */
export default { fetch: handleDoc };
