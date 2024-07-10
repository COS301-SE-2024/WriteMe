import { NextResponse } from 'next/server';
import { auth } from 'apps/writeme/auth';
import { bookmarkUserSchema } from 'apps/writeme/db/user-schema';
import { bookmarkStory, isBookmarked, unbookmarkStory } from 'apps/writeme/services/users';

export async function POST(req: Request) {
  try {
    const session = await auth();
    
    if (!session?.user) {
      return new NextResponse(JSON.stringify({
        status: 'fail', message: "You are not logged in",
      }), { status : 401})
    } else {
        const { storyId } =  bookmarkUserSchema.parse(await req.json())
        const bookmarked = await isBookmarked(session?.user?.id as string, storyId)
        if (bookmarked) {
          await unbookmarkStory(session.user.id as string, storyId)
          return new NextResponse(JSON.stringify({
            status: 'success', message: "Bookmark removed",
          }), { status: 200 });
        }
        else {
          await bookmarkStory(session.user.id as string, storyId)
          return new NextResponse(JSON.stringify({
            status: 'success', message: "Bookmark added",
          }), { status: 200 });
        }
    }
  } catch (e: any) {
      return new NextResponse(JSON.stringify({
        status: 'error', message: e.message,
    }), { status: 500 });
  }
}