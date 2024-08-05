import { auth } from "apps/writeme/auth";
import { db } from "apps/writeme/db/db";
import { UpsertNoteSchema } from "apps/writeme/db/notes-schema";
import { notepads } from "apps/writeme/db/schema";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
      const session = await auth();
      
      if (!session?.user) {
        return new NextResponse(JSON.stringify({
          status: 'fail', message: "You are not logged in",
        }), { status : 401})
      } else {
          const { storyId, chapterId, content } =  UpsertNoteSchema.parse(await req.json());
            let user = session.user.id || "";

          let res = await db.insert(notepads).values({chapter: chapterId, author: user, content: content}).onConflictDoUpdate({
            target: [notepads.chapter, notepads.author],
            set: { content: content}
          }).returning()
        return new NextResponse(JSON.stringify({
            status: "success",
            message: res
        }))
      }
    } catch (e: any) {
        return new NextResponse(JSON.stringify({
          status: 'error', message: e.message,
      }), { status: 500 });
    }
  }