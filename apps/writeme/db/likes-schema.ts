import { object, string, boolean, TypeOf } from 'zod';

export const likeSchema = object({
  storyId: string({ required_error: 'a story id is required' }).uuid(),
  chapterId: string({ required_error: 'a story id is required' })
    .uuid()
    .optional(),
});

export type LikedInput = TypeOf<typeof likeSchema>;
