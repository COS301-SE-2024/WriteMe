import { db } from '../db/db';
import { chapters } from '../db/schema';

export async function getChapter(id: string){
  const chapter = await db.query.chapters.findFirst({
    with: {
      story: true
    },
    where: (chapters, {eq}) => eq(chapters.id, id)
  })
  return chapter;
}
