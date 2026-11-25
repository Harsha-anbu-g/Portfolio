import { ATTEMPT_RETENTION_HOURS, COLLECTIONS } from './config.js';

const SCHEMA = [
  `CREATE TABLE IF NOT EXISTS deepwork_docs (
     user_id text NOT NULL,
     coll text NOT NULL CHECK (coll IN ('tasks', 'blocks')),
     id text NOT NULL,
     body jsonb NOT NULL,
     updated_at timestamptz NOT NULL DEFAULT now(),
     PRIMARY KEY (user_id, coll, id)
   )`,
  `CREATE TABLE IF NOT EXISTS deepwork_sign_in_attempts (
     id bigserial PRIMARY KEY,
     address text NOT NULL,
     attempted_at timestamptz NOT NULL DEFAULT now()
   )`,
  `CREATE INDEX IF NOT EXISTS deepwork_sign_in_attempts_address_idx ON deepwork_sign_in_attempts (address, attempted_at)`,
];

/* Two cold starts can race to create the same table; Postgres reports that as one of these. */
const ALREADY_EXISTS_CODES = new Set(['23505', '42P07', '42710']);

async function createSchema(db) {
  for (const statement of SCHEMA) {
    try {
      await db.query(statement);
    } catch (error) {
      if (!ALREADY_EXISTS_CODES.has(error && error.code)) throw error;
    }
  }
}

/**
 * Data access for Deep Work. Every query is parameterised and scoped to one user.
 * @param {{ query: (text: string, params?: unknown[]) => Promise<{ rows: object[] }> }} db
 *   A Postgres pool in production; any client with the same `query` shape elsewhere.
 */
export function createRepository(db) {
  let schemaReady = null;

  const ensureSchema = () => {
    if (!schemaReady) {
      schemaReady = createSchema(db).catch((error) => {
        schemaReady = null;
        throw error;
      });
    }
    return schemaReady;
  };

  const run = async (text, params) => {
    await ensureSchema();
    return db.query(text, params);
  };

  return {
    /** Every task and planned hour for one user. */
    async listDocs(userId) {
      const { rows } = await run(
        'SELECT coll, id, body FROM deepwork_docs WHERE user_id = $1 ORDER BY coll, id',
        [userId],
      );
      const empty = Object.fromEntries(COLLECTIONS.map((name) => [name, []]));
      return rows.reduce((grouped, row) => ({ ...grouped, [row.coll]: [...grouped[row.coll], { id: row.id, ...row.body }] }), empty);
    },

    /** How many items one user has in a collection. */
    async countDocs(userId, collection) {
      const { rows } = await run('SELECT count(*)::int AS total FROM deepwork_docs WHERE user_id = $1 AND coll = $2', [userId, collection]);
      return rows[0].total;
    },

    /** Whether an item already exists. */
    async hasDoc(userId, collection, id) {
      const { rows } = await run('SELECT 1 FROM deepwork_docs WHERE user_id = $1 AND coll = $2 AND id = $3', [userId, collection, id]);
      return rows.length > 0;
    },

    /** Create an item, or replace it if it exists. */
    async saveDoc(userId, collection, id, body) {
      await run(
        `INSERT INTO deepwork_docs (user_id, coll, id, body) VALUES ($1, $2, $3, $4::jsonb)
         ON CONFLICT (user_id, coll, id) DO UPDATE SET body = EXCLUDED.body, updated_at = now()`,
        [userId, collection, id, JSON.stringify(body)],
      );
    },

    /** Remove an item. Removing one that is already gone is not an error. */
    async deleteDoc(userId, collection, id) {
      await run('DELETE FROM deepwork_docs WHERE user_id = $1 AND coll = $2 AND id = $3', [userId, collection, id]);
    },

    /**
     * Count one sign-in try for an address, unless it has used up its tries for now.
     * The check and the count are one statement, so a burst of tries cannot all slip past the limit.
     * @returns {Promise<boolean>} whether this try may go ahead
     */
    async allowAttempt(address, windowMinutes, maxAttempts) {
      const { rows } = await run(
        `INSERT INTO deepwork_sign_in_attempts (address)
         SELECT $1::text
         WHERE (SELECT count(*) FROM deepwork_sign_in_attempts
                WHERE address = $1::text AND attempted_at > now() - ($2::int * interval '1 minute')) < $3::int
         RETURNING id`,
        [address, windowMinutes, maxAttempts],
      );
      if (rows.length === 0) return false;
      await run(`DELETE FROM deepwork_sign_in_attempts WHERE attempted_at < now() - ($1::int * interval '1 hour')`, [ATTEMPT_RETENTION_HOURS]);
      return true;
    },

    /** Forget the tries from an address after it signs in correctly. */
    async clearAttempts(address) {
      await run('DELETE FROM deepwork_sign_in_attempts WHERE address = $1', [address]);
    },
  };
}
