import { hash } from 'bcryptjs';
import { NextResponse } from 'next/server';
import { createUserSchema, updateUserSchema, updateUserSchemaOAuth } from '../../../db/user-schema';
import { ZodError } from 'zod';
import { users } from '../../../db/schema';
import { db } from '../../../db/db';
import { auth } from 'apps/writeme/auth';
import { and, eq, not } from 'drizzle-orm';
import { getUser } from 'apps/writeme/services/users';

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

const isEmailUnique = async(email: string) => {

  const result = db.query.users.findFirst({
    where: (users, {eq}) => eq(users.email, email)
  })

  return result === null;
}

export async function PUT(req: Request){
  try {
    const session = await auth();
    
    if (!session?.user){
      return new NextResponse(JSON.stringify({
        status: 'fail', message: "You are not logged in",
        }), { status : 401})
        }
    const user_ = await getUser(session.user.id!)
    
    if (user_?.password) {
      const input = updateUserSchema.parse(await req.json());
      
      if (session.user.email !== input.email) {
        const emailUnique = await isEmailUnique(input.email);
        if (!emailUnique) {
          return NextResponse.json(
            {
              status: 'fail',
              message: 'User with that email already exists',
            },
            { status: 409 }
          );
        }
      }
  
      let userPassword = user_?.password
      if (input.password && input.password.trim().length > 0) {
        userPassword = await hash(input.password, 12);
      }
  
      // @ts-ignore
      const user = await updateUser({
        ...input,
        email: input.email.toLowerCase(),
        password: userPassword,
        id: session.user.id,
      });
  
      return NextResponse.json({
        user: {
          id: user.updatedId,
        },
      });
    } else {
      const input = updateUserSchemaOAuth.parse(await req.json());
      
      if (session.user.email !== input.email) {
        const emailUnique = await isEmailUnique(input.email);
        if (!emailUnique) {
          return NextResponse.json(
            {
              status: 'fail',
              message: 'User with that email already exists',
            },
            { status: 409 }
          );
        }
      }

      // @ts-ignore
      const user = await updateUser({
        ...input,
        email: input.email.toLowerCase(),
        password: null,
        id: session.user.id,
      });
  
      return NextResponse.json({
        user: {
          id: user.updatedId,
        },
      });
    }
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



