import { auth } from '../auth';
import { db } from '../db/db';
import { users } from '../db/schema';
import { and, eq } from 'drizzle-orm';

export async function getUser(id: string) {

  const result = db.query.users.findFirst({
    where: (users, {eq}) => eq(users.id, id)
  })

  return result
}
