function slugify(str: String) {
    return String(str)
      .normalize('NFKD') // split accented characters into their base characters and diacritical marks
      .replace(/[\u0300-\u036f]/g, '') // remove all the accents, which happen to be all in the \u03xx UNICODE block.
      .trim() // trim leading or trailing whitespace
      .toLowerCase() // convert to lowercase
      .replace(/[^a-z0-9 -]/g, '') // remove non-alphanumeric characters
      .replace(/\s+/g, '-') // replace spaces with hyphens
      .replace(/-+/g, '-'); // remove consecutive hyphens
  }
  
  import 'dotenv/config';
  import { migrate } from 'drizzle-orm/postgres-js/migrator';
  import { drizzle } from 'drizzle-orm/postgres-js';
  import postgres from 'postgres';
  import { genres, voteCategories } from './schema';
  
  export const connection = postgres(
    'postgres://username:password@localhost:5432/database',
    {
      host: process.env.DB_HOST?.trimEnd(),
      user: process.env.DB_USER?.trimEnd(),
      password: process.env.DB_PASSWORD?.trimEnd(),
      database: process.env.DB_NAME?.trimEnd(),
      port: parseInt(process.env.DB_PORT?.trimEnd() || '5432'),
      max: 1,
    }
  );
  
  let initial_genres = [
    'Best Overall',
    "Most Creative",
    "Best Fiction",
    "Most Inspiring",
  ];
  
  const db = drizzle(connection);
  
  const runMigration = async () => {
    // This will run migrations on the database, skipping the ones already applied
  
    const items = initial_genres.map(g => ({
      id: slugify(g),
      category: g
    }))

    await db.insert(voteCategories).values(items)
  
    // await db.insert(genres).values(items);
  
    // Don't forget to close the connection, otherwise the script will hang
    await connection.end();
  };
  runMigration().then((r) => {
    console.log('seeding succeeded');
  });
  