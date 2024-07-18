import { and } from "drizzle-orm";
import { db } from "../db/db";

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