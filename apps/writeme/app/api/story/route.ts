/* v8 ignore start */
import { NextResponse } from "next/server";
import { createUserSchema } from "../../../db/user-schema";
import { object, string, ZodError } from "zod";
import { users, stories, storyGenres, chapters } from "../../../db/schema";
import { db } from "../../../db/db";
import { createStorySchema, deleteStorySchema, updateStorySchema } from "../../../db/story-schema";
import { auth } from "../../../auth";
import { eq, and } from "drizzle-orm";
import { getStory } from 'apps/writeme/services/stories';

type NewStory = typeof stories.$inferInsert;
const insertStory = async (story: NewStory) => {
  const result = await db.insert(stories).values(story).returning();
  return result[0];
};

export async function POST(req: Request) {
  try {
    const session = await auth();

    if (!session?.user) {
      return new NextResponse(
        JSON.stringify({
          status: "fail",
          message: "You are not logged in",
        }),
        { status: 401 },
      );
    }

    const { brief, title, description } = createStorySchema.parse(
      await req.json(),
    );

    // @ts-ignore
    const story = await insertStory({
      userId: session.user.id,
      content: "",
      brief: brief,
      title: title,
      description: description,
      blocks: [],
      cover:
        "https://www.writersdigest.com/.image/t_share/MTcxMDY0NzcxMzIzNTY5NDEz/image-placeholder-title.jpg",
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
          status: "error",
          message: "Validation failed",
          errors: error.errors,
        },
        { status: 400 },
      );
    }

    return NextResponse.json(
      {
        status: "error",
        message: error.message || "Internal Server Error",
      },
      { status: 500 },
    );
  }
}

type UpdadtedStory = any;

const updateStory = async (story: UpdadtedStory) => {
  const result = await db
    .update(stories)
    .set({
      blocks: story.blocks,
      title: story.title,
      description: story.description,
      brief: story.brief,
      content: story.content,
      published: story.published,
    })
    .where(eq(stories.id, story.id))
    .returning({ updatedId: stories.id });

  return result[0];
};

export async function PUT(req: Request) {
  try {
    const session = await auth();

    if (!session?.user) {
      return new NextResponse(
        JSON.stringify({
          status: "fail",
          message: "You are not logged in",
        }),
        { status: 401 },
      );
    }

    const raw_json = await req.json();

    // console.log(raw_json);

    const input = updateStorySchema.parse(raw_json);

    const requested_story = await db.query.stories.findFirst({
      where: (stories, { eq, and }) =>
        and(
          eq(stories.id, input.id),
          eq(stories.userId, session.user?.id || ""),
        ),
    });

    if (requested_story) {
      // delete current genres

      await db.delete(storyGenres).where(eq(storyGenres.storyId, input.id));

      // console.log(input.genre)

      // insert new or current genres
      // input.genre?.forEach
      const genreUpdates = input.genre?.map((g) => ({
        storyId: input.id,
        genreId: g,
      }));

      if (genreUpdates && genreUpdates.length > 0) {
        await db.insert(storyGenres).values(genreUpdates || []);
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
    } else {
      return NextResponse.json(
        {
          status: "failed",
          message: "unable to update story, you do not have permission",
        },
        {
          status: 401,
        },
      );
    }
  } catch (error: any) {
    console.log(error);
    if (error instanceof ZodError) {
      return NextResponse.json(
        {
          status: "error",
          message: "Validation failed",
          errors: error.errors,
        },
        { status: 400 },
      );
    }

    return NextResponse.json(
      {
        status: "error",
        message: error.message || "Internal Server Error",
      },
      { status: 500 },
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const session = await auth();

    if (!session?.user) {
      return new NextResponse(
        JSON.stringify({
          status: "fail",
          message: "You are not logged in",
        }),
        { status: 401 },
      );
    }

    const deleteStorySchema = object({
      id: string({ required_error: "a story id is required" }),
    });

    const input = deleteStorySchema.parse(await req.json());
    const story = await getStory(input.id);
    
    if (!story) {
      return new NextResponse(
        JSON.stringify({
          status: 'fail',
          message: 'Story not found',
        }),
        { status: 404 }
      );
    }

    if (story.userId !== session.user.id) {
      return new NextResponse(
        JSON.stringify({
          status: 'fail',
          message: 'You do not have permission to delete this story',
        }),
        { status: 403 }
      );
    }

    await db.delete(stories).where(eq(stories.id, input.id));

    return NextResponse.json({
      status: 'success',
      message: 'Story deleted successfully',
    });
  } catch (error: any) {
    console.log(error);
    if (error instanceof ZodError) {
      return NextResponse.json(
        {
          status: "error",
          message: "Validation failed",
          errors: error.errors,
        },
        { status: 400 },
      );
    }

    return NextResponse.json(
      {
        status: "error",
        message: error.message || "Internal Server Error",
      },
      { status: 500 },
    );
  }
}
