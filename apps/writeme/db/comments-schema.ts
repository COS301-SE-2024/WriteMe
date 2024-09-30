import { TypeOf, object, string, boolean, z, array, number } from 'zod';
import { chapters } from './schema';


export const readCommentSchema = object({
    userId: string().optional(),
    storyId: string().optional(),
    chapterId: string().optional(),
})

// todo: use refine to ensure either a storyId or a chapter Id is present
export const createCommentSchema = object({
    content: string({required_error:  "comment content is required"}).max(256, "Comment is too long, a maximum of 256 characters are allowed").min(1, "comment should be at least on character long."),
    storyId: string().optional(),
    chapterId: string().optional(),
    parentId: number().optional(),
  })

export const updateCommentSchema = object({
    id: number({required_error : "a comment id is required"}).int().nonnegative(),
    content: string({required_error:  "comment content is required"}).max(256, "Comment is too long, a maximum of 256 characters are allowed").min(1, "comment should be at least on character long."),
})


export const deleteCommentSchema = object({
    id: number({required_error : "a comment id is required"}).int().nonnegative()
})

export type CreateCommentInput = TypeOf<typeof createCommentSchema>;
export type UpdateCommentInput = TypeOf<typeof updateCommentSchema>;
export type ReadCommentInput = TypeOf<typeof readCommentSchema>;
export type DeleteCommentInput = TypeOf<typeof deleteCommentSchema>;
export type NewComment = typeof chapters.$inferInsert;