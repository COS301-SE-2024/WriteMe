import { NextResponse, NextRequest } from 'next/server';
import { writeathonCheckSchema } from '../../../../db/story-schema';
import { ZodError } from 'zod';
import { db } from '../../../../db/db';
import { writeathons } from '../../../../db/schema';

export async function POST(req: NextRequest) {
  try {
    const { util_token } = writeathonCheckSchema.parse(await req.json());

    if (util_token === process.env.UTIL_TOKEN) {
      //todo
      //find participants
      //
      //award participants
      //
      //update users
      //
      //

      await db.update(writeathons).set({ complete: true });
    }

    return NextResponse.json(
      {
        message: 'failed',
      },
      {
        status: 401,
      }
    );
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
