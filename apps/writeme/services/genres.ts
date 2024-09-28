import { db } from "../db/db";
import { genres } from "../db/schema";

export async function getAllGenres(){
    let result = await db.query.genres.findMany();
    return result;
}
