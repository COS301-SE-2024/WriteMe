import { db } from '../db/db';
import { chapters } from '../db/schema';

export async function getPublishedChapter(chapterId: string){
  const result = await db.query.chapters.findFirst({
    where: (chapters, {eq, and}) => and(eq(chapters.published, true), eq(chapters.id, chapterId)),
    with: {
      likes: true,
      story: true,
      comments: {
        with: {
          author: true
        }
      }
    }
  })

  return result;
}
