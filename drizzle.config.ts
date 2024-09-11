import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: './apps/writeme/db/schema.ts',
  out: './drizzle',
  dialect: 'postgresql',
  dbCredentials: {
    host: process.env.DB_HOST.trimEnd(),
    user: process.env.DB_USER.trimEnd(),
    password: process.env.DB_PASSWORD.trimEnd(),
    database: process.env.DB_NAME.trimEnd(),
    port: process.env.DB_PORT.trimEnd(),
    ssl: false,
  },
});
