/* v8 ignore start */
import { auth } from '../auth';
import { db } from '../db/db';
import { stories, chapters, users } from '../db/schema';
import { and, sql } from 'drizzle-orm';

export async function getMyStories() {
  const session = await auth();

  const result = db.query.stories.findMany({
    where: (stories, { eq }) => eq(stories.userId, session.user.id),
    with: {
      comments: true
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
  });
  return result;
}

export async function getStory(id: string) {
  const result = db.query.stories.findFirst({
    with: {
      author: true,
      chapters: {
        with: {
          comments : {
            with : {
              author: true
            }
          },
          likes: true
        }
      },
      comments: {
        where: (comments, { isNull }) => isNull(comments.chapterId),
        with: {
          author: true
        }

      },
      likes: true
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
          author: true
        }
      },
      chapters: {
        where: (chapters, {eq}) => eq(chapters.published, true),
        with : {
          likes: true,
          comments: true
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
      //genres: true,
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
