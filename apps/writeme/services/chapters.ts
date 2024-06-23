/* v8 ignore start */
import { db } from '../db/db';
import { chapters } from '../db/schema';


export async function getChapterInfo(chapterId: string){
  const result = await db.query.chapters.findFirst({
    where: (chapters, {eq}) => eq(chapters.id, chapterId)
  })

  return result
}

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


export async function getChapter(id: string){
  const chapter = await db.query.chapters.findFirst({
    with: {
      story: true
    },
    where: (chapters, {eq}) => eq(chapters.id, id)
  })
  return chapter;
}
