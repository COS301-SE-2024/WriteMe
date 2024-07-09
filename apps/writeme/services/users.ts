/* v8 ignore start */
import { auth } from '../auth';
import { db } from '../db/db';
import { users, userFollowers } from '../db/schema';
import { and, eq, not } from 'drizzle-orm';

export async function getUser(id: string) {

  const result = await db.query.users.findFirst({
    where: (users, {eq}) => eq(users.id, id)
  })

  return result
}

export async function isFollowing(userId: string, followedId: string) {
  const result = await db.query.userFollowers.findFirst({               //current user                        //user we want to follow
    where: (userFollowers, {eq, and}) => and(eq(userFollowers.followerId, userId), eq(userFollowers.followedId, followedId))
  })

  return result !== undefined;
}

export async function unfollowUser (userId: string, followedId: string) {
  await db.delete(userFollowers).where(and(eq(userFollowers.followerId, userId), eq(userFollowers.followedId, followedId)));
};

export async function followUser (userId: string, followedId: string) {
  await db.insert(userFollowers).values({ followerId: userId, followedId: followedId });
};

export async function bookmarkStory (userId: string, storyId: string) {
  
};

export async function unbookmarkStory (userId: string, storyId: string) {
  
};
