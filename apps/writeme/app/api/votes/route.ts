import { NextResponse } from 'next/server';
import { auth } from 'apps/writeme/auth';
import { storyWriteathonVoteSchema } from 'apps/writeme/db/user-schema';
import { voteStory } from 'apps/writeme/services/writeathons';

export async function POST(req: Request) {
  try {
    const session = await auth();
    
    if (!session?.user) {
      return new NextResponse(JSON.stringify({
        status: 'fail', message: "You are not logged in",
      }), { status : 401})
    } else {
        const { writeathonId, storyId, categories } = storyWriteathonVoteSchema.parse(await req.json())
        await voteStory(session.user.id as string, writeathonId, storyId, categories)
        return new NextResponse(JSON.stringify({
          status: 'success', message: "Vote added",
        }), { status: 200 });
    }
  } catch (e: any) {
      return new NextResponse(JSON.stringify({
        status: 'error', message: e.message,
    }), { status: 500 });
  }
}