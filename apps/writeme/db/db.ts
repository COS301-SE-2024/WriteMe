/* v8 ignore start */


import postgres from 'postgres';
import { drizzle } from 'drizzle-orm/postgres-js';
import type { AdapterAccountType } from 'next-auth/adapters';
import * as schema from "./schema";

export const connection = postgres('postgres://username:password@localhost:5432/database', {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: parseInt(process.env.DB_PORT || "5432"),
});


export const db = drizzle(connection, {schema});
