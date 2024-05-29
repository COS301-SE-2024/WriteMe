import 'dotenv/config';
import {migrate} from "drizzle-orm/node-postgres/migrator"
import { db, connection } from './schema';

const runMigration = async () =>{
  // This will run migrations on the database, skipping the ones already applied
  await migrate(db, { migrationsFolder: './drizzle/' });

// Don't forget to close the connection, otherwise the script will hang
  await connection.end();
}
runMigration().then(r => {
  console.log("migrate ran")
});

