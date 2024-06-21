//
import { relations } from 'drizzle-orm';
import {
  timestamp,
  pgTable,
  text,
  primaryKey,
  integer,
  varchar,
  serial,
  boolean,
  json
} from 'drizzle-orm/pg-core';

import type { AdapterAccountType } from 'next-auth/adapters';


// @ts-ignore
export const users = pgTable('user', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text('name'),
  email: text('email').notNull(),
  password: text('password'),
  emailVerified: timestamp('emailVerified', { mode: 'date' }),
  image: text('image')
});

// @ts-ignore
export const accounts = pgTable(
  'account',
  {
    userId: text('userId')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    type: text('type').$type<AdapterAccountType>().notNull(),
    provider: text('provider').notNull(),
    providerAccountId: text('providerAccountId').notNull(),
    refresh_token: text('refresh_token'),
    access_token: text('access_token'),
    expires_at: integer('expires_at'),
    token_type: text('token_type'),
    scope: text('scope'),
    id_token: text('id_token'),
    session_state: text('session_state')
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId]
    })
  })
);

// @ts-ignore
export const sessions = pgTable('session', {
  sessionToken: text('sessionToken').primaryKey(),
  userId: text('userId')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  expires: timestamp('expires', { mode: 'date' }).notNull()
});

// @ts-ignore
export const verificationTokens = pgTable(
  'verificationToken',
  {
    identifier: text('identifier').notNull(),
    token: text('token').notNull(),
    expires: timestamp('expires', { mode: 'date' }).notNull()
  },
  (vt) => ({
    compoundKey: primaryKey({ columns: [vt.identifier, vt.token] })
  })
);

// @ts-ignore
export const stories = pgTable('story', {
  id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
  userId: text('user_id').references(() => users.id).notNull(),
  title: varchar('title', { length: 255 }).notNull(),
  content: text('content').notNull(),
  description: text("description"),
  brief: text("brief"),
  cover: text("cover_image"),
  blocks: json("blocks"),
  published: boolean('published').default(false).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const storiesRelations = relations(stories, ({many}) => ({
  tags: many(storyTags),
  genres: many(storyGenres)
}))

// @ts-ignore
export const comments = pgTable('comments', {
  id: serial('id').primaryKey(),
  storyId: text('story_id').references(() => stories.id).notNull(),
  userId: text('user_id').references(() => users.id).notNull(),
  content: text('content').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Likes table
// @ts-ignore
export const likes = pgTable('likes', {
  id: serial('id').primaryKey(),
  storyId: text('story_id').references(() => stories.id).notNull(),
  userId: text('user_id').references(() => users.id).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const genres = pgTable('genres', {
  id: serial('id').primaryKey(),
  genre: text('genre').notNull(),
});

export const tags = pgTable('tags', {
  id: serial('id').primaryKey(),
  tag: text('tag').notNull(),
});

export const tagsRelations = relations(tags, ({many}) => ({
  stories: many(storyTags),
}));

export const storyGenres = pgTable('story_genres', {
  storyId: text('story_id').references(() => stories.id).notNull(),
  genreId: serial('genre_id').references(() => genres.id).notNull(),
},
(t) => ({
  pk: primaryKey({columns: [t.storyId, t.genreId]})
})
);

export const genreRelations = relations(genres, ({many}) => ({
  stories: many(storyGenres),
}));

export const storyGenreRelations = relations(storyGenres, ({one}) => ({
  stories: one(stories, {fields: [storyGenres.storyId], references: [stories.id]}),
  genres: one(genres, {fields: [storyGenres.genreId], references: [genres.id]}),
}));

export const storyTags = pgTable('story_tags', {
  storyId: text('story_id').references(() => stories.id).notNull(),
  tagId: serial('tag_id').references(() => tags.id).notNull(),
},
(t) => ({
  pk: primaryKey({columns: [t.storyId, t.tagId]})
})
);

export const storyTagsRelations = relations(storyTags, ({one}) => ({
  stories: one(stories, {fields: [storyTags.storyId], references: [stories.id]}),
  tags: one(tags, {fields: [storyTags.tagId], references: [tags.id]}),
}));