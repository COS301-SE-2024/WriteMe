import { and } from "drizzle-orm";
import { db } from "../db/db";

interface WriteathonProps {
  startDate?: Date,
  endDate?: Date
}

// export async function getAllWriteathons({ startDate = new Date(), endDate = new Date(new Date().setDate(new Date().getDate() + 7)) }: WriteathonProps) {
//   const result = db.query.writeathons.findMany({
//     where: (writeathons, { between }) =>
//       and(
//         between(writeathons.startDate, startDate, endDate),
//         between(writeathons.endDate, startDate, endDate),
//       ),
//   });
//   return result;
// }

export async function getAllWriteathons() {
  const result = db.query.writeathons.findMany({
    where: (writeathons, { between }) =>
      and(
        between(writeathons.startDate, new Date(), writeathons.endDate),
        between(writeathons.endDate, writeathons.startDate, new Date()),
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