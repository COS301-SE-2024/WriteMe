import { auth } from '../auth';
import { db } from '../db/db';


export async function getMyStories(){
  const session = await auth();

  const result = db.query.stories.findMany({
    where: (stories, {eq}) => eq(stories.userId, session.user.id)
  })
  return result;
}


export async function getPublishedStories(){

  const result = db.query.stories.findMany({
    where: (stories, {eq}) => eq(stories.published, true)
  })


  return result;
}
