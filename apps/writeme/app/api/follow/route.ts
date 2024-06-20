import { NextResponse } from 'next/server';
import { users } from '../../../db/schema';
import { db } from '../../../db/db';
import { and, eq, not } from 'drizzle-orm';
import { getUser } from 'apps/writeme/services/users';
import { auth } from 'apps/writeme/auth';
import { FollowerUserSchema, followerUserSchema } from 'apps/writeme/db/user-schema';
import { isFollowing, unfollowUser, followUser } from 'apps/writeme/services/users';

export async function POST(req: Request) {
  try {
    const session = await auth();
    
    if (!session?.user) {
      return new NextResponse(JSON.stringify({
        status: 'fail', message: "You are not logged in",
      }), { status : 401})
    }
    else {
      const { userId } = followerUserSchema.parse(await req.json()) // Person we want to follow
      const followedUser = await getUser(userId)
      if (session.user.id !== userId) {
        const following = await isFollowing(session?.user?.id as string, userId)
        if (following) {
          await unfollowUser(session.user.id as string, userId)
          return new NextResponse(JSON.stringify({
            status: 'success', message: "Unfollowed " + followedUser?.name,
          }), { status: 200 });
        } 
        else {
          await followUser(session.user.id as string, userId)
          return new NextResponse(JSON.stringify({
            status: 'success', message: "Followed " + followedUser?.name,
          }), { status: 200 });
        }
      } else {
          return new NextResponse(JSON.stringify({
            status: 'fail', message: "You cannot follow yourself",
        }), { status: 400 });
      }
    }
  } catch (e: any) {
      return new NextResponse(JSON.stringify({
        status: 'error', message: e.message,
    }), { status: 500 });
  }
}