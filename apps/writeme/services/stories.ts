/* v8 ignore start */
import { auth } from '../auth';
import { db } from '../db/db';
import { stories, chapters, users, userBookmarks } from '../db/schema';
import { and, gt, not, or, sql } from 'drizzle-orm';

export async function searchStories(q: string){
  let result = await db.select({title: stories.title, id: stories.id, cover: stories.cover}).from(stories).where(sql`to_tsvector('english', ${stories.title}) @@ websearch_to_tsquery('english', ${q})`).limit(5);

  return result;
}

export async function getMyStories() {
  const session = await auth();

  const result = db.query.stories.findMany({
    where: (stories, { eq }) => eq(stories.userId, session.user.id),
    with: {
      comments: {
        with: {
          replies: {
            with : {
              author: true
            }
          },
          author: true
        }
      }
    }
  });
  return result;
}

export async function getMyDrafts() {
  const session = await auth();

  const result = db.query.stories.findMany({
    where: (stories, { eq }) =>
      and(eq(stories.userId, session.user.id), eq(stories.published, false)),
  });
  return result;
}

export async function getUserStories(userId: string) {
  const result = db.query.stories.findMany({
    where: (stories, { eq }) =>
      and(eq(stories.userId, userId), eq(stories.published, true)),
  })
  return result;
}

export async function getUserBookmarkedStories(userId: string) {
  const result = db.query.userBookmarks.findMany({
    where: (userBookmarks, { eq }) =>
      eq(userBookmarks.userId, userId),
      with: {
        story: true
      }
  })
  return result;
}

export async function getStory(id: string) {
  const session = await auth();

  const result = db.query.stories.findFirst({
    with: {
      author: true,
      chapters: {
        with: {
          comments : {
            with : {
              author: true,
            }
          },
          likes: true
        }
      },
      comments: {
        where: (comments, { isNull }) => isNull(comments.chapterId),
        with: {
          author: true,
          replies: {
            with: {
              author: true
            }
          }
        }

      },
      likes: true,
      bookmarkedBy: {
        where: (userBookmarks, { eq }) => eq(userBookmarks.userId, session?.user?.id || ""),
        limit: 1
      }
    },
    where: (stories, { eq }) => eq(stories.id, id),
  });

  return result;
}

export async function getPublishedStory(id: string) {

  // todo: remove cause user might not be logged in
  const session = await auth();

  const result = db.query.stories.findFirst({
    where: (stories, { eq }) =>
      and(eq(stories.id, id), eq(stories.published, true)),
    extras: {
      liked: sql<boolean>`exists (select 1 from likes where story_id like '${stories.id}' and user_id like '${users.id}')`.as('liked')
    },
    with : {
      author: true,
      likes: true,
      comments: {
        with: {
          author: true,
          replies: {
            with: {
              author: true
            }
          }
        }
      },
      chapters: {
        where: (chapters, {eq}) => eq(chapters.published, true),
        with : {
          likes: true,
          comments: {
            with: {
              author: true,
              replies: {
                with: {
                  author: true
                }
              }
            }
          }
        }
      }
    }
  });

  return result;
}
export async function getStoryInfo(id: string){
  const result = db.query.stories.findFirst({
    where: (stories, {eq}) => eq(stories.id, id),
    with: {
      genres: true,
      // tags: true
    }
  })

  return result
}


export async function getPublishedStories() {
  const result = db.query.stories.findMany({
    where: (stories, { eq }) => eq(stories.published, true),
    with: {
      chapters: {
        with: {
          likes: true,
        },
      },
      author: true,
      likes: true,
      comments: true
    },
  });

  return result;
}

type NewStory = typeof stories.$inferInsert;
export const insertStory = async (story: NewStory) => {
  const result = await db.insert(stories).values(story).returning();
  return result[0];
};
