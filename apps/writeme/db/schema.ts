/* v8 ignore start */
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
  date,
  index
} from 'drizzle-orm/pg-core';

import type { AdapterAccountType } from 'next-auth/adapters';
import { relations, sql } from 'drizzle-orm';

export { nextUploadAssetsTable } from 'next-upload/store/drizzle/postgres-js';

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
    length: 256
  })
    .default('')
    .notNull(),
  onboarded: boolean("onboarded").default(false)
});

export const userRelations = relations(users, ({ many }) => ({
  following: many(userFollowers, {
    relationName: 'following'
  }),
  followers: many(userFollowers, {
    relationName: 'followers'
  }),
  stories: many(stories),
  comments: many(comments),
  bookmarks: many(userBookmarks),
  votes: many(storyWriteathonVotes),
  notepads: many(notepads)
}));

export const userFollowers = pgTable('user_followers', {
  followerId: text('follower_id')
    .references(() => users.id, {
      onDelete: 'cascade'
    })
    .notNull(),
  followedId: text('followed_id')
    .references(() => users.id, {
      onDelete: 'cascade'
    })
    .notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull()
}, (t) => {
  return {
    pk: primaryKey({
      columns: [t.followerId, t.followedId]
    })
  };
});

export const followersRelations = relations(userFollowers, ({ one }) => ({
  followers: one(users, {
    fields: [userFollowers.followedId], // references who is following you
    references: [users.id],
    relationName: 'followers'
  }),
  following: one(users, {
    fields: [userFollowers.followerId], // references to who you are following
    references: [users.id],
    relationName: 'following'
  })
}));

export const userBookmarks = pgTable('user_bookmarks', {
  userId: text('user_id')
    .references(() => users.id, {
      onDelete: 'cascade'
    })
    .notNull(),
  storyId: text('story_id')
    .references(() => stories.id, {
      onDelete: 'cascade'
    })
    .notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull()
}, (t) => {
  return {
    pk: primaryKey({
      columns: [t.userId, t.storyId]
    })
  }
})

export const userBookmarksRelations = relations(userBookmarks, ({ one }) => ({
  user: one(users, {
    fields: [userBookmarks.userId],
    references: [users.id],
    relationName: 'user'
  }),
  story: one(stories, {
    fields: [userBookmarks.storyId],
    references: [stories.id],
    relationName: 'story'
  })
}));

// @ts-ignore
export const accounts = pgTable('account', {
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

export const voteCategories = pgTable('vote_category', {
  id: text('id')
    .primaryKey()
    .notNull()
    .$defaultFn(() => crypto.randomUUID()),
  category: text('category')
    .notNull(),
})

export const voteCategoryRelations = relations(voteCategories, ({many}) => ({
  votes: many(storyWriteathonVotes)
}))


export const storyWriteathonVotes = pgTable('story_writeathon_votes', {
  userId: text('user_id')
    .references(() => users.id, {
      onDelete: 'cascade'
    })
    .notNull(),
  writeathonId: text('writeathon_id')
    .references(() => writeathons.id, {
      onDelete: 'cascade'
    }).notNull(),
  storyId: text('story_id')
    .references(() => stories.id, {
      onDelete: 'cascade'
    })
    .notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  categoryId: text('category_id')
    .references(() => voteCategories.id),
}, (t) => {
  return {
    pk: primaryKey({
      columns: [t.userId, t.storyId, t.writeathonId, t.categoryId]
    })
  }
})

export const storyWriteathonVotesRelations = relations(storyWriteathonVotes, ({ one }) => ({
  user: one(users, {
    fields: [storyWriteathonVotes.userId],
    references: [users.id],
    relationName: 'user'
  }),
  story: one(stories, {
    fields: [storyWriteathonVotes.storyId],
    references: [stories.id],
    relationName: 'story'
  }),
  writeathon: one(writeathons, {
    fields: [storyWriteathonVotes.storyId],
    references: [writeathons.id],
    relationName: 'writeathon'
  }),
  categories: one(voteCategories, {
    fields: [storyWriteathonVotes.categoryId],
    references: [voteCategories.id]
  })
}));

export const writeathons = pgTable('writeathon', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  userId: text('user_id')
    .references(() => users.id)
    .notNull(),
  cover: text('cover_image').default("https://www.writersdigest.com/.image/t_share/MTcxMDY0NzcxMzIzNTY5NDEz/image-placeholder-title.jpg"),
  title: varchar('title', { length: 255 }).notNull(),
  description: text('description'),
  brief: text('brief'),
  startDate: date('start_date', { mode: "date" }),
  endDate: date('end_date', { mode: "date" })
})

export const writeathonsRelations = relations(writeathons, ({ many }) => ({
  stories: many(storiesWriteathons),
  votes: many(storyWriteathonVotes)
}))

export const storiesWriteathons = pgTable('story_writeathons', {
  storyId: text('story_id').notNull().references(() => stories.id),
  writeathonId: text('writeathon_id').notNull().references(() => writeathons.id)
}, (t) => {
  return {
    pk: primaryKey({
      columns: [t.storyId,t.writeathonId]
    })
  }
})

export const storiesWriteathonsRelations = relations(storiesWriteathons, ({one})=> ({
  story: one(stories, {
    fields: [storiesWriteathons.storyId],
    references: [stories.id]
  }),
  writeathon: one(writeathons, {
    fields: [storiesWriteathons.writeathonId],
    references: [writeathons.id]
  })
}))


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
  exportable: boolean('exportable').default(false).notNull(),
},  (t) => ({
  titleSearchIndex:index("title_search_index").using("gin", sql`to_tsvector('english', ${t.title})`)
}));

export const storiesRelations = relations(stories, ({ one, many }) => ({
  chapters: many(chapters),
  author: one(users, {
    fields: [stories.userId],
    references: [users.id]
  }),
  comments: many(comments),
  likes: many(likes),
  bookmarkedBy: many(userBookmarks),
  genres: many(storyGenres),
  writeathons: many(storiesWriteathons),
  votes: many(storyWriteathonVotes)
}));


export const versions = pgTable('versions', {
  chapterId: text("chapter_id").notNull(),
  blocks: jsonb('blocks'),
  createdAt: timestamp("created_at", {
    mode: 'date',
    precision: 3
  }).defaultNow().notNull(),
}, (t) => ({
  pk: primaryKey({
    columns: [t.chapterId, t.createdAt]
  })
}))

export const versionRelations = relations(versions, ({one}) => ({
  chapter: one(chapters, {
    fields: [versions.chapterId],
    references: [chapters.id]
  })
}))

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
    .references(() => stories.id, { onDelete: 'cascade'})
    .notNull()
});

export const chaptersRelations = relations(chapters, ({ one, many }) => ({
  story: one(stories, {
    fields: [chapters.storyId],
    references: [stories.id]
  }),
  comments: many(comments),
  likes: many(likes),
  versions: many(versions),
  notepads: many(notepads)
}));

export const notepads = pgTable('notepads', {
  author: text('author_id').notNull(),
  chapter: text('chapter_id').notNull(),
  content: text('content').default('')
}, (t) => ({
  pk: primaryKey({ columns: [t.chapter, t.author]})
}))

export const notepadsRelations = relations(notepads, ({ one}) => ({
  chapter: one(chapters, {
    fields: [notepads.chapter],
    references:  [chapters.id]
  }),
  author: one(users, {
    fields: [notepads.author],
    references: [users.id]
  })
}))


// @ts-ignore
export const comments = pgTable('comments', {
  id: serial('id').primaryKey(),
  storyId: text('story_id')
    .references(() => stories.id, { onDelete: 'cascade' }),
  chapterId: text('chapter_id').references(() => chapters.id, { onDelete: 'cascade' }),
  userId: text('user_id')
    .references(() => users.id)
    .notNull(),
  content: text('content').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull()
});

export const commentsRelations = relations(comments, ({ one, many }) => {
  return {
    chapter: one(chapters, {
      fields: [comments.chapterId],
      references: [chapters.id]
    }),
    story: one(stories, {
      fields: [comments.storyId],
      references: [stories.id]
    }),
    author: one(users, {
      fields: [comments.userId],
      references: [users.id]
    }),
    replies: many(commentReplies, {
      relationName: 'replies'
    }),
    parent: many(commentReplies, {
      relationName: 'parent'
    })
  };
});

export const commentReplies = pgTable("comment_replies", {
  parentComment: serial('parent_id').notNull().references(() => comments.id),
  childComment: serial('child_id').notNull().references(() => comments.id)
}, (t) => ({
  pk: primaryKey({
    columns: [t.parentComment, t.childComment]
  })
}))

export const commentRepliesRelations = relations(commentReplies, ({one}) => ({
  parentComment: one(comments,{
    fields: [commentReplies.childComment],
    references: [comments.id],
    relationName: "parent"
  }),
  replies: one(comments, {
    fields: [commentReplies.parentComment],
    references: [comments.id],
    relationName: "replies"
  })
}))




// Likes table
// @ts-ignore
export const likes = pgTable(
  'likes',
  {
    id: serial("id").primaryKey(),
    storyId: text('story_id')
      .references(() => stories.id)
      .notNull(),
    chapterId: text('chapter_id').references(() => chapters.id),
    userId: text('user_id')
      .references(() => users.id)
      .notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull()
  }
);

export const likesRelations = relations(likes, ({ one }) => ({
  chapter: one(chapters, {
    fields: [likes.chapterId],
    references: [chapters.id]
  }),
  story: one(stories, {
    fields: [likes.storyId],
    references: [stories.id]
  })
}));


// types

// export type Story = typeof stories.$inferSelect;
// export type Chapter = typeof chapters.$inferSelect;
// export type Like = typeof likes.$inferSelect;
// export type Comment = typeof chapters.$inferSelect;
//
// export type ChapterWithLikesAndComments = Chapter & {
//   likes: Like[],
//   comments: Comment[]
// }
//
//
// export type StoryWithChaptersAndLikes = Story & {
//   chapters: ChapterWithLikesAndComments[],
//   likes: Like[]
// }



export const genres = pgTable('genres', {
  id: text('id').primaryKey(),
  genre: text('genre').notNull(),
});
//
// export const tags = pgTable('tags', {
//   id: serial('id').primaryKey(),
//   tag: text('tag').notNull(),
// });

// export const tagsRelations = relations(tags, ({many}) => ({
//   stories: many(storyTags),
// }));

export const storyGenres = pgTable('story_genres', {
  storyId: text('story_id').references(() => stories.id).notNull(),
  genreId: text('genre_id').references(() => genres.id).notNull(),
},
(t) => ({
  pk: primaryKey({columns: [t.storyId, t.genreId]})
})
);
//
export const genreRelations = relations(genres, ({many}) => ({
  stories: many(storyGenres),
}));
//
export const storyGenreRelations = relations(storyGenres, ({one}) => ({
  stories: one(stories, {fields: [storyGenres.storyId], references: [stories.id]}),
  genres: one(genres, {fields: [storyGenres.genreId], references: [genres.id]}),
}));
//
// export const storyTags = pgTable('story_tags', {
//   storyId: text('story_id').references(() => stories.id).notNull(),
//   tagId: serial('tag_id').references(() => tags.id).notNull(),
// },
// (t) => ({
//   pk: primaryKey({columns: [t.storyId, t.tagId]})
// })
// );
//
// export const storyTagsRelations = relations(storyTags, ({one}) => ({
//   stories: one(stories, {fields: [storyTags.storyId], references: [stories.id]}),
//   tags: one(tags, {fields: [storyTags.tagId], references: [tags.id]}),
// }));
