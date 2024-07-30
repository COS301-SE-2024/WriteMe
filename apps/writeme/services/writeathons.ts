import { and } from "drizzle-orm";
import { db } from "../db/db";
import { storyWriteathonVotes, voteCategories } from "../db/schema";

export async function getAllWriteathons(currDate: Date) {
  const result = await db.query.writeathons.findMany({
    where: (writeathons, { and, lt, gt }) => 
      and(
        lt(writeathons.startDate, currDate),
        gt(writeathons.endDate, currDate),
    ),
  });
  return result;
}

export async function getUserWriteathons(userId: string) {
  const result = db.query.writeathons.findMany({
    where: (writeathons, { eq }) =>
      eq(writeathons.userId, userId),
  })
  return result;
}

export async function getWriteathon(writeathonId: string) {
  const result = db.query.writeathons.findFirst({
    where: (writeathons, { eq }) =>
      eq(writeathons.id, writeathonId),
  })
  return result;
}

export async function getStoryWriteathons(writeathonId: string) {
  const result = db.query.storiesWriteathons.findMany({
    where: (storyWriteathons, { eq }) =>
      eq(storyWriteathons.writeathonId, writeathonId),
      with: {
        story: true
      }
  })
  return result;
}

export async function voteStory(userId: string, writeathonId: string, storyId: string, categoryId: string) {
  await db.insert(storyWriteathonVotes).values({ userId: userId, writeathonId: writeathonId, storyId: storyId, categoryId: categoryId});
};

export async function getVoteCategories() {
  const result = db.select().from(voteCategories).execute()
  return result
}