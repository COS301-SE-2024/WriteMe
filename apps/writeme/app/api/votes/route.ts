import { NextResponse } from 'next/server';
import { auth } from 'apps/writeme/auth';
import { storyWriteathonVoteSchema } from 'apps/writeme/db/user-schema';
import { isVoted, unVoteStory, voteStory } from 'apps/writeme/services/users';

export async function POST(req: Request) {
  try {
    const session = await auth();
    
    if (!session?.user) {
      return new NextResponse(JSON.stringify({
        status: 'fail', message: "You are not logged in",
      }), { status : 401})
    } else {
        const { storyId } =  storyWriteathonVoteSchema.parse(await req.json())
        const voted = await isVoted(session?.user?.id as string, storyId)
        if (voted) {
          await unVoteStory(session.user.id as string, storyId)
          return new NextResponse(JSON.stringify({
            status: 'success', message: "Removed vote",
          }), { status: 200 });
        }
        else {
          await voteStory(session.user.id as string, storyId)
          return new NextResponse(JSON.stringify({
            status: 'success', message: "Vote added",
          }), { status: 200 });
        }
    }
  } catch (e: any) {
      return new NextResponse(JSON.stringify({
        status: 'error', message: e.message,
    }), { status: 500 });
  }
}