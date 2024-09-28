/* v8 ignore start */
import { auth } from '../../../../auth';
import { NextResponse } from 'next/server';
import { ZodError } from 'zod';
import { createChapterSchema, editChapterSchema, updateChapterSchema } from '../../../../db/chapter-schema';
import { chapters, stories, versions } from '../../../../db/schema';
import { db } from '../../../../db/db';
import { eq } from 'drizzle-orm';
import { updateStorySchema } from '../../../../db/story-schema';


type UpdadtedChapter = any;


const updateChapter = async (chapter: UpdadtedChapter) => {


  const result = await db.update(chapters).set({
    cover: chapter.cover,
    title: chapter.title,
    content: chapter.content,
    order: chapter.order,
    published: chapter.published,
  }).where(eq(chapters.id, chapter.id)).returning({updatedId: chapters.id});

  return result[0];
};

// const updateChapterMeta = async (chapter: any)=> {
//   const result = await db.update(chapters).set({

//   })
// }

export async function PUT(req: Request){
  try {
    const session = await auth();

    if (!session?.user){
      return new NextResponse(JSON.stringify({
        status: 'fail', message: "You are not logged in",
      }), { status : 401})
    }

    // console.log(await req.json());

    const input = editChapterSchema.parse(await req.json());

    // : ensure user owns story
    // console.log(input);
    // @ts-ignore
    const chapter = await updateChapter({
      ...input,
    });
    // console.log(story);


    return NextResponse.json({
      chapter: {
        id: chapter.updatedId,
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
