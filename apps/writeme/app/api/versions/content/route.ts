import { auth } from "apps/writeme/auth";
import { getVersionContent, getVersions } from "apps/writeme/services/chapters";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

export const GET = async (req: NextRequest) => {
    try {

        const session = await auth();
    
        if (!session?.user){
          return new NextResponse(JSON.stringify({
            status: 'fail', message: "You are not logged in",
          }), { status : 401})
        }

        let chapter_id = req.nextUrl.searchParams.get("id")
        if (!chapter_id){
            return NextResponse.json(
                {
                  status: 'error',
                  message: 'Chapter ID required',
                },
                { status: 400 }
              )
        }
    
        let time = req.nextUrl.searchParams.get("time")
        if (!time){
          return NextResponse.json(
            {
              status: 'error',
              message: 'time is required',
            },
            { status: 400 }
          )
        }
        
        let version = await getVersionContent(chapter_id, new Date(time));
    
    
        return NextResponse.json({
          version: version
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