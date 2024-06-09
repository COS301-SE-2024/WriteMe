import { hash } from 'bcryptjs';
import { NextResponse } from 'next/server';
import { createUserSchema, updateUserSchema } from '../../../db/user-schema';
import { ZodError } from 'zod';
import { users } from '../../../db/schema';
import { db } from '../../../db/db';
import { auth } from 'apps/writeme/auth';
import { eq } from 'drizzle-orm';

type NewUser = typeof users.$inferInsert;
const insertUser = async (user: NewUser) => {
  const result = await db.insert(users).values(user).returning();
  return result[0];
};

export async function POST(req: Request) {
  try {
    const { name, email, password } = createUserSchema.parse(await req.json());

    const hashed_password = await hash(password, 12);

    const user = await insertUser({
      name,
      email: email.toLowerCase(),
      password: hashed_password,
    });

    return NextResponse.json({
      user: {
        name: user.name,
        email: user.email,
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

    if (error.code === '23505') {
      return NextResponse.json(
        {
          status: 'fail',
          message: 'User with that email already exists',
        },
        { status: 409 }
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

type UpdatedUser = any;

const updateUser = async (user: UpdatedUser) => {
  const result = await db.update(users).set({name: user.name, email: user.email, bio: user.bio, password: user.password}).where(eq(users.id, user.id)).returning({updatedId: users.id});

  return result[0];
};

export async function PUT(req: Request){
  try {
    const session = await auth();

    if (!session?.user){
      return new NextResponse(JSON.stringify({
        status: 'fail', message: "You are not logged in",
      }), { status : 401})
    }
    
    const input = updateUserSchema.parse(await req.json());

    // @ts-ignore
    const user = await updateUser({
      ...input,
      id: session.user.id,
    });

    return NextResponse.json({
      user: {
        id: user.id,
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

    if (error.code === '23505') {
      return NextResponse.json(
        {
          status: 'fail',
          message: 'User with that email already exists',
        },
        { status: 409 }
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



