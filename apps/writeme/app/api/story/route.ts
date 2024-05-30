import { NextResponse } from 'next/server';
import { createUserSchema } from '../../../db/user-schema';
import { undefined, ZodError } from 'zod';
import { users , stories } from '../../../db/schema';
import { db } from '../../../db/db';
import { createStorySchema } from '../../../db/story-schema';
import { title } from '@storybook/core-server/dist/presets/common-preset';
import { auth } from '../../../auth';

type NewStory = typeof stories.$inferInsert;
const insertStory = async (story: NewStory) => {
  const result = await db.insert(stories).values(story).returning();
  return result[0];
};

export async function POST(req: Request) {
  try {

    const session = await auth();

    if (!session?.user){
      return new NextResponse(JSON.stringify({
        status: 'fail', message: "You are not logged in",
      }), { status : 401})
    }

    const { brief, title, description } = createStorySchema.parse(await req.json());


    const story = await insertStory({
      userId: session.user.id,
      content: '',
      brief: brief,
      title: title,
      description: description
    });


    return NextResponse.json({
      story: {
        id: story.id,
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
