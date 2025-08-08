import { betterAuth } from "better-auth";
import { Pool } from "pg";

const env = typeof Bun !== "undefined" ? Bun.env : process.env;

export const auth = betterAuth({
  database: new Pool({
    connectionString: env.DATABASE_URL,
  }),
  emailAndPassword: {
    enabled: true,
  },
  trustedOrigins: [
    "http://localhost:5173", // frontend
    "http://localhost:5000", // backend
  ],
});
