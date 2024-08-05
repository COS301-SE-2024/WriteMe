import 'dotenv/config';
import {migrate} from "drizzle-orm/postgres-js/migrator"
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

export const connection = postgres('postgres://username:password@localhost:5432/database', {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: parseInt(process.env.DB_PORT || "5432"),
  max: 1,
});

export const db = drizzle(connection);

const runMigration = async () =>{
  // This will run migrations on the database, skipping the ones already applied
  await migrate(db, { migrationsFolder: './drizzle/' });

// Don't forget to close the connection, otherwise the script will hang
  await connection.end();
}
runMigration().then(r => {
  console.log("migrate ran")
});

