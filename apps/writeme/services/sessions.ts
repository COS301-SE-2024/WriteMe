import { liveEditorSessions, viewableSessions } from '../db/schema';
import { db } from '../db/db';
import { auth } from '../auth';
import { eq } from 'drizzle-orm';


export const createLiveEditorSession = async (
  chapterId: string,
  userId: string
) => {
  const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours from now

  const existing = await db.select({
    id: liveEditorSessions.id
  }).from(liveEditorSessions).where(eq(liveEditorSessions.chapterId, chapterId));

  if (existing.length > 0){
    return {
      sessionId: existing[0].id
    }
  }

  const result = await db.insert(liveEditorSessions).values({
    chapterId,
    expiresAt,
    userId,
  }).returning({
    sessionId: liveEditorSessions.id
  });

  return result[0];
};

export async function getEditableChapter(sessionId: string) {
  const result = await db.query.liveEditorSessions.findFirst({
    where: (liveEditorSessions, { eq }) => eq(liveEditorSessions.id, sessionId),
    with: {
      user: {
        columns: {
          name: true,
          id: true,
          image: true
        }
      },
      chapter: {
        author: true,
        likes: true,
        comments: {
          with: {
            author: true,
          },
        },
      },
    },
  });

  return result;
}

export async function isLiveSessionOwner(sessionId :string): Promise<boolean> {
  const session = await auth();

  const view_session = await db.query.liveEditorSessions.findFirst({
    where: (liveEditorSessions, {eq}) => eq(liveEditorSessions.id, sessionId),
    columns: {
      userId: true
    }
  });
  return view_session?.userId == session?.user?.id;
}


export const createViewableSession = async (
  chapterId: string,
  userId: string
) => {
  const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours from now

  const existing = await db.select({
    id: viewableSessions.id
  }).from(viewableSessions).where(eq(viewableSessions.chapterId, chapterId));

  if (existing.length > 0){
    return {
      sessionId: existing[0].id
    }
  }

  const result = await db.insert(viewableSessions).values({
    chapterId,
    expiresAt,
    userId,
  }).returning({
    sessionId: viewableSessions.id
  });

  return result[0];
};

export async function getViewableChapter(sessionId: string) {
  const result = await db.query.viewableSessions.findFirst({
    where: (viewableSessions, { eq }) => eq(viewableSessions.id, sessionId),
    with: {
      user: {
        columns: {
          name: true,
          id: true,
          image: true
        }
      },
      chapter: {
        author: true,
        likes: true,
        comments: {
          with: {
            author: true,
          },
        },
      },
    },
  });

  return result;
}

export async function isViewableSessionOwner(sessionId :string): Promise<boolean> {
  const session = await auth();

  const view_session = await db.query.viewableSessions.findFirst({
    where: (viewableSessions, {eq}) => eq(viewableSessions.id, sessionId),
    columns: {
      userId: true
    }
  });

  // console.log(chapter)
  return view_session?.userId == session?.user?.id;
}

export async function  getMySharedViewableSessions() {
  const session = await auth();

  if (!session?.user.id){
    return []
  }

  const sessions = await db.query.viewableSessions.findMany({
    where: (viewableSessions, {eq}) => eq(viewableSessions.userId, session.user.id),
    columns: {
      id: true
    },
    with: {
      chapter: {
        columns: {
          title: true,
          cover: true
        }
      }
    }
  })

  return sessions;
}

export async function  getMySharedEditableSessions() {
  const session = await auth();

  if (!session?.user.id){
    return []
  }

  const sessions = await db.query.liveEditorSessions.findMany({
    where: (liveEditorSessions, {eq}) => eq(liveEditorSessions.userId, session.user.id),
    columns: {
      id: true
    },
    with: {
      chapter: {
        columns: {
          title: true,
          cover: true
        }
      }
    }
  })

  return sessions;
}
