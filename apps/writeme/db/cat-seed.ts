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
  import { voteCategories } from './schema';

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

let all_awards = [
  {
    category: "Fan Favourite",
    description: "Awarded to a story with the most likes in a writeathon"
  },
  {
    category: "Poll Pro",
    description: "Awarded when you vote in a writeathon"
  },
  {
    category: "Pacing Pro",
    description: "Community Award for stories that have the best timing."
  },
  {
    category: "Sci-fi Specialist",
    description: "Community Award for stories that scream Stars Wars and Dune"
  }
  ,{
    category: "Emotion Evoker",
    description: "Community Award for stories that could make a grown man cry"
  },{
    category: "Imagery Expert",
    description: "Community Award for stories that speak to your third eye"
  },{
    category: "Creative Spark",
    description: "Community Award for stories show the most creativity"
  },{
    category: "First Draft",
    description: "Awarded when you enter your first writeathon"
  },{
    category: "Writathon Regular",
    description: "Award for competing in 2 writeathons"
  },{
    category: "Writathon Enthusiast",
    description: "Award for competing in 5 writeathons"
  },{
    category: "Writathon Veteran",
    description: "Award for competing in 10 writeathons"
  }
];


  let initial_genres = [
    {
      category: "Pacing Pro",
      description: "Community Award for stories that have the best timing."
    },
    {
      category: "Sci-fi Specialist",
      description: "Community Award for stories that scream Stars Wars and Dune"
    }
    ,{
      category: "Emotion Evoker",
      description: "Community Award for stories that could make a grown man cry"
    },{
      category: "Imagery Expert",
      description: "Community Award for stories that speak to your third eye"
    },{
      category: "Creative Spark",
      description: "Community Award for stories show the most creativity"
    }
  ];

  const db = drizzle(connection);

  const runMigration = async () => {
    // This will run migrations on the database, skipping the ones already applied

    const items = initial_genres.map(g => ({
      id: slugify(g?.category || ""),
      category: g.category,
      description: g.description
    }))

    await db.insert(voteCategories).values(items)

    // await db.insert(genres).values(items);

    // Don't forget to close the connection, otherwise the script will hang
    await connection.end();
  };
  runMigration().then((r) => {
    console.log('seeding succeeded');
  });
