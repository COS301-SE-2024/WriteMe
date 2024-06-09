import { db } from "../db/db";
import { tags } from "../db/schema";

export async function getAllTags(){
    let result = await db.select({value: tags.id, label: tags.tag}).from(tags);
    return result;
}