//
import {
  timestamp,
  pgTable,
  text,
  primaryKey,
  integer,
  varchar,
  serial,
  boolean,
  json,
  jsonb,
} from 'drizzle-orm/pg-core';

import type { AdapterAccountType } from 'next-auth/adapters';
import { relations } from 'drizzle-orm';

// @ts-ignore
export const users = pgTable('user', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text('name'),
  email: text('email').notNull(),
  password: text('password'),
  emailVerified: timestamp('emailVerified', { mode: 'date' }),
  image: text('image'),
  bio: varchar('bio', {
    length: 256,
  })
    .default('')
    .notNull(),
});

// export const userRelations = relations(users ,({many}) => ({
//   following: many(userFollowers),
//   followers: many(userFollowers)
// }))

export const userFollowers = pgTable('user_followers', {
  id: serial('id').primaryKey(),
  followerId: text('follower_id')
    .references(() => users.id, {
      onDelete: 'cascade',
    })
    .notNull(),
  followedId: text('followed_id')
    .references(() => users.id, {
      onDelete: 'cascade',
    })
    .notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// export const followersRelations = relations(userFollowers, ({ one }) => ({
//   followers: one(users, {
//     fields: [userFollowers.followerId],
//     references: [users.id]
//   }),
//   following: one(users, {
//     fields: [userFollowers.followedId],
//     references: [users.id]
//   })
// }))

export const userRelations = relations(users, ({ one, many }) => ({
  stories: many(stories),
}));

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
    session_state: text('session_state'),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
  })
);

// @ts-ignore
export const sessions = pgTable('session', {
  sessionToken: text('sessionToken').primaryKey(),
  userId: text('userId')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  expires: timestamp('expires', { mode: 'date' }).notNull(),
});

// @ts-ignore
export const verificationTokens = pgTable(
  'verificationToken',
  {
    identifier: text('identifier').notNull(),
    token: text('token').notNull(),
    expires: timestamp('expires', { mode: 'date' }).notNull(),
  },
  (vt) => ({
    compoundKey: primaryKey({ columns: [vt.identifier, vt.token] }),
  })
);

// @ts-ignore
export const stories = pgTable('story', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  userId: text('user_id')
    .references(() => users.id)
    .notNull(),
  title: varchar('title', { length: 255 }).notNull(),
  content: text('content').notNull(),
  description: text('description'),
  brief: text('brief'),
  cover: text('cover_image'),
  blocks: json('blocks'),
  published: boolean('published').default(false).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const storiesRelations = relations(stories, ({ one, many }) => ({
  chapters: many(chapters),
  author: one(users, {
    fields: [stories.userId],
    references: [users.id],
  }),
  likes: many(likes),
}));

// @ts-ignore
export const chapters = pgTable('chapter', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  order: serial('order').notNull(),
  title: text('title').notNull().default(''),
  content: text('content').notNull().default(''),
  cover: text('cover_image'),
  blocks: jsonb('blocks'),
  published: boolean('published').default(false).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
  storyId: text('story_id')
    .references(() => stories.id)
    .notNull(),
});

export const chaptersRelations = relations(chapters, ({ one, many }) => ({
  story: one(stories, {
    fields: [chapters.storyId],
    references: [stories.id],
  }),
  likes: many(likes),
}));

// @ts-ignore
export const comments = pgTable('comments', {
  id: serial('id').primaryKey(),
  storyId: text('story_id')
    .references(() => stories.id)
    .notNull(),
  userId: text('user_id')
    .references(() => users.id)
    .notNull(),
  content: text('content').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Likes table
// @ts-ignore
export const likes = pgTable(
  'likes',
  {
    storyId: text('story_id')
      .references(() => stories.id)
      .notNull(),
    chapterId: text('chapter_id').references(() => chapters.id),
    userId: text('user_id')
      .references(() => users.id)
      .notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
  },
  (t) => ({
    pk: primaryKey({
      columns: [t.storyId, t.chapterId, t.userId],
    }),
  })
);

export const likesRelations = relations(likes, ({ one }) => ({
  chapter: one(chapters, {
    fields: [likes.chapterId],
    references: [chapters.id],
  }),
  story: one(stories, {
    fields: [likes.storyId],
    references: [stories.id],
  }),
}));
