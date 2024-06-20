import { likeSchema } from '../../../db/likes-schema';
import { auth } from '../../../auth';
import { NextRequest, NextResponse } from 'next/server';
import { db } from '../../../db/db';
import { likes } from '../../../db/schema';
import { and, eq } from 'drizzle-orm';

export async function POST(req: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user) {
      return new NextResponse(
        JSON.stringify({
          status: 'fail',
          message: 'You are not logged in',
        }),
        { status: 401 }
      );
    } else {
      const { storyId, chapterId } = likeSchema.parse(await req.json());

      let like: any = undefined;

      if (chapterId) {
        like = await db.query.likes.findFirst({
          where: (likes, { eq, and }) =>
            and(
              eq(likes.chapterId, chapterId),
              eq(likes.userId, session?.user?.id as string),
              eq(likes.storyId, storyId)
            ),
        });
      } else {
        like = await db.query.likes.findFirst({
          where: (likes, { eq, and }) =>
            and(
              eq(likes.userId, session?.user?.id as string),
              eq(likes.storyId, storyId)
            ),
        });
      }

      if (like) {
        if (chapterId) {
          await db
            .delete(likes)
            .where(
              and(
                eq(likes.chapterId, chapterId),
                eq(likes.userId, session?.user?.id as string),
                eq(likes.storyId, storyId)
              )
            );
        } else {
          await db
            .delete(likes)
            .where(
              and(
                eq(likes.userId, session?.user?.id as string),
                eq(likes.storyId, storyId)
              )
            );
        }
      } else {
        db.insert(likes).values({
          storyId: storyId,
          chapterId: chapterId,
          userId: session.user.id,
        } as any);
      }
    }
  } catch (e: any) {
    console.log(e);
  }
}
