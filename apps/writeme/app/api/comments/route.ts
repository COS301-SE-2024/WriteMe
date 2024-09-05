/* v8 ignore start */
import { NextResponse, NextRequest } from 'next/server';
import { auth } from '../../../auth';
import { createCommentSchema, updateCommentSchema, deleteCommentSchema } from "../../../db/comments-schema";
import { db } from '../../../db/db';
import { commentReplies, comments } from '../../../db/schema';
import { eq } from 'drizzle-orm';

// Fetching
// should allow anyone to get comments
export async function GET(req: NextRequest) {
    try {


    }catch (e : any){
    }
}

// Creation
// only authenticated users
export async function POST(req: NextRequest) {
    try {
        const session = await auth();

        if (!session?.user){
            return new NextResponse(JSON.stringify({
              status: 'fail', message: "You are not logged in",
            }), { status : 401})
        }else {
            const {content, storyId, chapterId, parentId}= createCommentSchema.parse(await req.json());

            const [comment] = await db.insert(comments).values({
                content : content,
                storyId : storyId,
                chapterId : chapterId,
                userId: session.user.id
            }as any).returning({
                id: comments.id,
                content: comments.content
            });
            
            if (parentId) {
              await db.insert(commentReplies).values({
                parentComment: parentId,
                childComment: comment.id
              });
            }
            return NextResponse.json({
                success: true,
                ...comment
            }, {status: 200})
        }
    }catch (e: any){
        console.log(e)
    }
}

// Updating
// only authenticated users
// ensure only can update their own comments
export async function PUT(req: NextRequest) {
    try {
        const session = await auth();

        if (!session?.user){
            return new NextResponse(JSON.stringify({
              status: 'fail', message: "You are not logged in",
            }), { status : 401})
        }else {
            const {id , content} = updateCommentSchema.parse(await req.json());

            let comment = await db.query.comments.findFirst({
                where: (comments, {eq}) => eq(comments.id, id),
                with: {
                    author: true
                }
            })

            // if comment exists and it's author is the current user
            if ( comment && comment.author.id == session.user.id as string ) {
                let updatedComment = await db.update(comments).set({
                    content,
                }).where(eq(comments.id, id)).returning({
                    id: comments.id,
                    content: comments.content
                })
                return new NextResponse(JSON.stringify({
                    status: 'success', ...updatedComment
                  }), { status : 200

                  })

            }else {
                return new NextResponse(JSON.stringify({
                    status: 'fail', message: "This is not your comment",
                  }), { status : 401})
            }
        }
    }catch (e: any){

    }
}

// Deleting
// only authenticated users
// ensure only can delete their own comments
export async function DELETE(req: NextRequest) {
    try {
        const session = await auth();

        if (!session?.user){
            return new NextResponse(JSON.stringify({
              status: 'fail', message: "You are not logged in",
            }), { status : 401})
        }else {
            const { id } = deleteCommentSchema.parse(await req.json());

            let comment = await db.query.comments.findFirst({
                where: (comments, {eq}) => eq(comments.id, id),
                with: {
                    author: true
                }
            })

            if ( comment && comment.author.id == session.user.id as string ) {
                await db.delete(comments).where(eq(comments.id, id))
                return new NextResponse(JSON.stringify({
                    status: 'success',
                  }), { status : 200

                  })

            } else {

            }
        }

    }catch (e: any){

    }
}
