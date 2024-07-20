import { auth } from "apps/writeme/auth";
import { db } from "apps/writeme/db/db";
import { storyWriteathons } from "apps/writeme/db/schema";
import { storyWriteathonSchema } from "apps/writeme/db/story-schema";
import { NextResponse } from "next/server";
import { ZodError } from "zod";

type NewStoryWriteathon = typeof storyWriteathons.$inferInsert;
const createStoryWriteathon = async (storyWriteathon: NewStoryWriteathon) => {
  const result = await db.insert(storyWriteathons).values(storyWriteathon).returning();
  return result[0];
}

export async function POST (req: Request) {
  try {
    const session = await auth();

    if (!session?.user){
      return new NextResponse(JSON.stringify({
        status: 'fail', message: "You are not logged in",
      }), { status : 401})
    }

    const { storyId, writeathonId } = storyWriteathonSchema.parse(await req.json());

    const storyWriteathon = await createStoryWriteathon({
      storyId: storyId,
      writeathonId: writeathonId
    });

    return NextResponse.json({
      storyWriteathon: {
        id: storyWriteathon.writeathonId,
      },
    });

  } catch (error: any) {
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