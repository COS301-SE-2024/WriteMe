import { auth } from '../auth';
import { db } from '../db/db';
import { users } from '../db/schema';
import { and, eq, not } from 'drizzle-orm';

export async function getUser(id: string) {

  const result = db.query.users.findFirst({
    where: (users, {eq}) => eq(users.id, id)
  })

  return result
}

export async function isEmailUnique(email: string, id: string) {

  const result = db.query.users.findFirst({
    where: (users, {eq}) => and(eq(users.email, email), not(eq(users.id, id)))
  })

  return result === null;
}