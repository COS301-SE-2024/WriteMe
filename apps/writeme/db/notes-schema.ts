import { object, string } from "zod";

export const UpsertNoteSchema = object({
    storyId: string({required_error: "A story is required"}),
    chapterId: string({required_error: "Chapter is Required"}),
    content: string().max(100000, "Description is too long, maximum of 100000 characters").default("").optional()
  })