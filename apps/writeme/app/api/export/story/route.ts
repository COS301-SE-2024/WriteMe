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
    const story = await getPublishedStory(input.id);

    if (!story || !story.exportable) {
      return new NextResponse(
        JSON.stringify({ status: 'fail', message: 'Story not found or not exportable' }),
        { status: 404 }
      );
    }

    return new NextResponse(JSON.stringify(story), { status: 200 });
  } catch (error) {
    console.error('Error fetching story:', error);

    return new NextResponse(
      JSON.stringify({ status: 'error', message: 'Failed to fetch story' }),
      { status: 500 }
    );
  }
}
