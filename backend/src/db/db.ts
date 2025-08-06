import { Pool } from "pg";

const pool = new Pool({
  connectionString: Bun.env.DATABASE_URL,
});

export const query = (text: string, parameters?: any[]) =>
  pool.query(text, parameters);
