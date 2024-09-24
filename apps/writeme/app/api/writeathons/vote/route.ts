import { auth } from 'apps/writeme/auth';
import { db } from 'apps/writeme/db/db';
import { writeathons, storyWriteathonVotes } from 'apps/writeme/db/schema';
import { writeathonSchema, writeathonVote } from 'apps/writeme/db/story-schema';
import { NextResponse } from 'next/server';
import { ZodError } from 'zod';

type NewVote = typeof storyWriteathonVotes.$inferInsert;
const createWriteathonVote = async (vote: NewVote) => {
  const result = await db.insert(storyWriteathonVotes).values(vote).returning();
  return result[0];
};

export async function POST(req: Request) {
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

    const { storyId, writeathonId, categoryId } = writeathonVote.parse(
      await req.json()
    );

    const writeathonVoteRes = await createWriteathonVote({
      userId: session.user.id || '',
      storyId,
      writeathonId,
      categoryId,
    });

    return NextResponse.json({
      writeathon: {
        id: writeathonVoteRes.id,
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
