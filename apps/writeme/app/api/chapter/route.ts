/* v8 ignore start */
import { auth } from '../../../auth';
import { NextResponse } from 'next/server';
import { undefined, ZodError } from 'zod';
import { createChapterSchema, editChapterSchema, updateChapterSchema } from '../../../db/chapter-schema';
import { chapters, stories, versions } from '../../../db/schema';
import { db } from '../../../db/db';
import { eq } from 'drizzle-orm';
import { updateStorySchema } from '../../../db/story-schema';

export type NewChapter = typeof chapters.$inferInsert;
const insertChapter = async (chapter: NewChapter) => {
  const result = await db.insert(chapters).values(chapter).returning();
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

    const { brief, title, description, storyId } = createChapterSchema.parse(await req.json());


    // @ts-ignore
    const chapter: NewChapter = await insertChapter({
      storyId: storyId,
      content: '',
      brief: brief,
      title: title,
      description: description,
      blocks: [
        {
          type: "heading",
          content: title
        }
      ],
      cover: 'https://www.writersdigest.com/.image/t_share/MTcxMDY0NzcxMzIzNTY5NDEz/image-placeholder-title.jpg'
    })


    return NextResponse.json(chapter);
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


type UpdadtedChapter = any;


const updateChapter = async (chapter: UpdadtedChapter) => {

  let updated_chapter = await db.insert(versions).values({
    chapterId: chapter.id,
    blocks: chapter.blocks
  })


  const result = await db.update(chapters).set({
    cover: chapter.cover,
    title: chapter.title,
    content: chapter.content,
    order: chapter.order,
    published: chapter.published,
    blocks: chapter.blocks
  }).where(eq(chapters.id, chapter.id)).returning({updatedId: chapters.id});

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

    const input = updateChapterSchema.parse(await req.json());

    // : ensure user owns story
    // console.log(input);
    // @ts-ignore
    const chapter = await updateChapter({
      ...input,
    });
    // console.log(story);


    return NextResponse.json({
      story: {
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
