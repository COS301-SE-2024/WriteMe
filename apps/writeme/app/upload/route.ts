import { NextUpload } from 'next-upload';
import { config } from './config';
import { NextRequest, NextResponse } from 'next/server';
import { NextUploadDrizzlePgStore } from 'next-upload/store/drizzle/postgres-js';
import { db } from 'apps/writeme/db/db';
import { auth } from 'apps/writeme/auth';

const nup = new NextUpload(
  {
    ...config,
  },
  new NextUploadDrizzlePgStore(db)
);

export const POST = async (request: NextRequest) => {
  const session = await auth();

  if (!session?.user) {
    return new NextResponse(
      JSON.stringify({
        status: 'fail',
        message: 'You are not logged in',
      }),
      { status: 401 }
    );
  }
  return nup.handler(request);
};

export const dynamic = 'force-dynamic';
