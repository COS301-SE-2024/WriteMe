import { auth } from "apps/writeme/auth";
import { db } from "apps/writeme/db/db";
import { writeathons } from "apps/writeme/db/schema";
import { updateWriteathonSchema, writeathonSchema } from 'apps/writeme/db/story-schema';
import { NextRequest, NextResponse } from 'next/server';
import { ZodError } from "zod";
import { and, eq } from 'drizzle-orm';

type NewWriteathon = typeof writeathons.$inferInsert;
const createWriteathon = async (writeathon: NewWriteathon) => {
  const result = await db.insert(writeathons).values(writeathon).returning();
  return result[0];
}

export async function POST (req: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user){
      return new NextResponse(JSON.stringify({
        status: 'fail', message: "You are not logged in",
      }), { status : 401})
    }

    const { title, description, brief, startDate, endDate } = writeathonSchema.parse(await req.json());

    const writeathon = await createWriteathon({
      userId: session.user.id || '',
      title: title,
      description: description,
      brief: brief,
      startDate: startDate,
      endDate: endDate
    });

    return NextResponse.json({
      writeathon: {
        id: writeathon.id,
      },
    });

  } catch (error: any) {
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


export async function PUT(req: NextRequest){
  try {
    const session = await auth();

    if (!session?.user){
      return new NextResponse(JSON.stringify({
        status: 'fail', message: "You are not logged in",
      }), { status : 401})
    }


    const writeathon_input = updateWriteathonSchema.parse(await req.json());
    const owner = await db.select().from(writeathons).where(and(eq(writeathons.id, writeathon_input.id), eq(writeathons.userId, session.user?.id || "")));
    if (owner && owner.length > 0){
      await db.update(writeathons).set(writeathon_input).returning();
      return NextResponse.json({
        "status": "success",
        "message": "Writeathon has been updated"
      })
    }else {
      return NextResponse.json({
        "status": "failed",
        "message": "Writeathon does not exist or is not owned by user"
      })
    }
    


  } catch (e) {
    return NextResponse.json({
      "status": "failed",
      "message": e
    }, {
      status: 500
    })
  }
}
