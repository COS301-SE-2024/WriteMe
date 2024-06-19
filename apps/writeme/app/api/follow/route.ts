import { NextResponse } from 'next/server';
import { users } from '../../../db/schema';
import { db } from '../../../db/db';
import { and, eq, not } from 'drizzle-orm';
import { getUser } from 'apps/writeme/services/users';
import { auth } from 'apps/writeme/auth';
import { FollowerUserSchema, followerUserSchema } from 'apps/writeme/db/user-schema';

export async function POST(req: Request) {
  try {
    const session = await auth();

    if (!session?.user){
      return new NextResponse(JSON.stringify({
        status: 'fail', message: "You are not logged in",
      }), { status : 401})
    }
    else {
      const { userId } = followerUserSchema.parse(await req.json())
      
    }
  } catch (e) {
    
  }
  
}