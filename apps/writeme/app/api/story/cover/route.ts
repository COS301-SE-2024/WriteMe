import { auth } from 'apps/writeme/auth';
import { db } from 'apps/writeme/db/db';
import { stories } from 'apps/writeme/db/schema';
import { updateStoryCoverSchema } from 'apps/writeme/db/story-schema';
import { eq, and } from 'drizzle-orm';
import { NextResponse } from 'next/server';
import { ZodError } from 'zod';

export async function PUT(req: Request) {
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
    }

    // console.log(await req.json());

    const input = updateStoryCoverSchema.parse(await req.json());

    // : ensure user owns story

    const story = await db
      .update(stories)
      .set({
        cover: input.cover,
      })
      .where(
        and(eq(stories.id, input.id), eq(stories.userId, session.user.id || ''))
      )
      .returning({
        updatedId: stories.id,
      });

    if (!story) {
      return NextResponse.json(
        {
          status: 'failed',
          message:
            'story does not exist or you do not have permission to update it',
        },
        {
          status: 401,
        }
      );
    }
    // console.log(story);

    return NextResponse.json({
      story: {
        id: story.updatedId,
      },
    });
  } catch (error: any) {
    console.log(error);
    if (error instanceof ZodError) {
      return NextResponse.json(
        {
          status: 'error',
          message: 'Validation failed',
          errors: error.errors,
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        status: 'error',
        message: error.message || 'Internal Server Error',
      },
      { status: 500 }
    );
  }
}
