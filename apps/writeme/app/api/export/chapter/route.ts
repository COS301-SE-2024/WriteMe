import { auth } from '../../../../auth';
import { NextResponse } from 'next/server';
import { exportChapterSchema } from '../../../../db/chapter-schema';
import { getPublishedStory } from '../../../../services/stories';

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session?.user) {
      return new NextResponse(
        JSON.stringify({ status: 'fail', message: 'You are not logged in' }),
        { status: 401 }
      );
    }

    const input = exportChapterSchema.parse(await req.json());
    const chapter = await getPublishedStory(input.id);

    if (!chapter) {
      return new NextResponse(
        JSON.stringify({ status: 'fail', message: 'Chapter not found' }),
        { status: 404 }
      );
    }

    return new NextResponse(JSON.stringify(chapter), { status: 200 });
  } catch (error) {
    console.error('Error fetching chapter:', error);

    return new NextResponse(
      JSON.stringify({ status: 'error', message: 'Failed to fetch chapter' }),
      { status: 500 }
    );
  }
}
