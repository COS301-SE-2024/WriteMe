import { isChapterOwner } from "apps/writeme/services/chapters";
import { auth } from "../../../auth";
import { NextResponse, NextRequest } from "next/server";
import { createLiveEditorSession, isLiveSessionOwner } from "apps/writeme/services/sessions";
import { z } from "zod";
import { db } from "apps/writeme/db/db";
import { liveEditorSessions } from "apps/writeme/db/schema";
import { eq } from "drizzle-orm";


export async function POST(req: NextRequest){
  try {
    const session = await auth();

    if (!session?.user){
      return NextResponse.json({
        status: 'fail',
        message: 'You are not logged in',
      }, {
        status: 401
      })
    }

    const { chapterId} = await req.json();
    const userId = session.user.id || "";

    const isOwner = await isChapterOwner(userId, chapterId);

    if (!isOwner){
      return NextResponse.json({
        status: 'fail',
        message: 'Only the owner can create a session'
      }, {
        status: 403
      })
    }

    const newSession = await createLiveEditorSession(chapterId, userId);
    return NextResponse.json({
      status: 'success',
      session: newSession.sessionId
    }, {
      status: 200
    })


  } catch (error: any){
    return NextResponse.json({

    })
  }
}

export async function DELETE(req:NextRequest) {
  const session = await auth();

  if (!session?.user){
    return NextResponse.json({
      status: 'fail',
      message: 'You are not logged in',
    }, {
      status: 401
    })
  }

  const { sessionId } = z.object({
    sessionId: z.string()
  }).parse(await req.json());

  if (!sessionId){
    return NextResponse.json({
      status: "failed",
      message: "No session Specified"
    }, {status: 400})
  }


  const owner = await isLiveSessionOwner(sessionId);

  if (owner){
    await db.delete(liveEditorSessions).where(eq(liveEditorSessions.id, sessionId));
    return NextResponse.json({
      status: "success",
      message: "Session has been deleted."
    }, {status: 200})
  }else {
    return NextResponse.json({
      status: "failed",
      message: "This Session is not owned by you."
    }, {status: 401})
  }

}

export async function GET(_request: Request) {
  const session = await auth();



  return NextResponse.json({
    authenticated: !!session,
    session,
  });
}
