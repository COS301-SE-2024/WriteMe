/* v8 ignore start */
import { db } from '../db/db';
import { chapters } from '../db/schema';


export async function getVersions(chapterId: string){
  const result = await db.query.versions.findMany({
    columns: {
      createdAt: true,
      chapterId: false,
      blocks: false
    },
    where: (versions, {eq}) => eq(versions.chapterId, chapterId),
  })
  return result
}

export async function getVersionContent(chapterId:string, timestamp: Date){
  const result = await db.query.versions.findFirst({
    columns: {
      blocks: true
    },
    where: (versions, {eq, and}) => and(eq(versions.chapterId, chapterId), eq(versions.createdAt, timestamp))
  })
  return result
}


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
