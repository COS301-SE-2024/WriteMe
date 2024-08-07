/* v8 ignore start */
import { NextResponse } from 'next/server';
import { createUserSchema } from '../../../db/user-schema';
import { object, string, ZodError } from 'zod';
import { users , stories, storyGenres } from '../../../db/schema';
import { db } from '../../../db/db';
import { createStorySchema, updateStorySchema } from '../../../db/story-schema';
import { title } from '@storybook/core-server/dist/presets/common-preset';
import { auth } from '../../../auth';
import { eq } from 'drizzle-orm';

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


    // @ts-ignore
    const story = await insertStory({
      userId: session.user.id,
      content: '',
      brief: brief,
      title: title,
      description: description,
      blocks: [],
      cover: 'https://www.writersdigest.com/.image/t_share/MTcxMDY0NzcxMzIzNTY5NDEz/image-placeholder-title.jpg'
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


type UpdadtedStory = any;


const updateStory = async (story: UpdadtedStory) => {
  const result = await db.update(stories).set({blocks: story.blocks, title: story.title, description: story.description, brief: story.brief, content: story.content, published: story.published}).where(eq(stories.id, story.id)).returning({updatedId: stories.id});

  return result[0];
};


export async function PUT(req: Request){
  try {
    const session = await auth();

    if (!session?.user){
      return new NextResponse(JSON.stringify({
        status: 'fail', message: "You are not logged in",
      }), { status : 401})
    }

    // console.log(await req.json());

    const input = updateStorySchema.parse(await req.json());

    // todo: check user owns story

    // delete current genres

    await db.delete(storyGenres).where(eq(storyGenres.storyId, input.id))

    // console.log(input.genre)

    // insert new or current genres
    // input.genre?.forEach
    const genreUpdates = input.genre?.map(g => ({
      storyId: input.id,
      genreId: g
    }))

    if (genreUpdates && genreUpdates.length > 0){
      await db.insert(storyGenres).values(genreUpdates || [])
    }

    // : ensure user owns story
    // console.log(input);
    // @ts-ignore
    const story = await updateStory({
      ...input,
      userId: session.user.id,
    });
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


export async function DELETE(req: Request){
  try {
    const session = await auth();

    if (!session?.user){
      return new NextResponse(JSON.stringify({
        status: 'fail', message: "You are not logged in",
      }), { status : 401})
    }

    const deleteStorySchema = object({
      id : string({required_error: "a story id is required"})})

    const input = deleteStorySchema.parse(await req.json());

    // todo: check user owns story

    // deletes story
    await db.delete(stories).where(eq(stories.id, input.id));



    return NextResponse.json({
      
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