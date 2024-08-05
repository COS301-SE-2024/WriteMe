import { auth } from "apps/writeme/auth";
import { db } from "apps/writeme/db/db";
import { chapters } from "apps/writeme/db/schema";
import { updateStoryCoverSchema } from "apps/writeme/db/story-schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { ZodError } from "zod";

export async function PUT(req: Request){
    try {
      const session = await auth();
  
      if (!session?.user){
        return new NextResponse(JSON.stringify({
          status: 'fail', message: "You are not logged in",
        }), { status : 401})
      }
  
      // console.log(await req.json());
  
      const input = updateStoryCoverSchema.parse(await req.json());
    //   console.log(input)
  
      // todo: check user owns story
  
      // : ensure user owns story

      const chapter = await db.update(chapters).set({
        cover: input.cover
      }).where(eq(chapters.id, input.id)).returning({
        updatedId: chapters.id
      })
      // console.log(story);
  
  
      return NextResponse.json({
        story: {
          id: chapter.updatedId,
        },
      });
    } catch (error: any) {
      console.log(error);
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
  