import { NextResponse } from 'next/server';
import { auth } from 'apps/writeme/auth';
import { bookmarkUserSchema } from 'apps/writeme/db/user-schema';

export async function POST(req: Request) {
  try {
    const session = await auth();
    
    if (!session?.user) {
      return new NextResponse(JSON.stringify({
        status: 'fail', message: "You are not logged in",
      }), { status : 401})
    } else {
      
    }
  }
}