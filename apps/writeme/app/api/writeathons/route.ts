import { auth } from "apps/writeme/auth";
import { db } from "apps/writeme/db/db";
import { writeathons } from "apps/writeme/db/schema";
import { writeathonSchema } from "apps/writeme/db/story-schema";
import { NextResponse } from "next/server";
import { ZodError } from "zod";

type NewWriteathon = any;
const createWriteathon = async (writeathon: NewWriteathon) => {
  const result = await db.insert(writeathons).values(writeathon).returning();
  return result[0];
}

export async function POST (req: Request) {
  try {
    const session = await auth();

    if (!session?.user){
      return new NextResponse(JSON.stringify({
        status: 'fail', message: "You are not logged in",
      }), { status : 401})
    }

    const { title, description, brief, startDate, endDate } = writeathonSchema.parse(await req.json());

    const writeathon = await createWriteathon({
      title: title,
      descripton: description,
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