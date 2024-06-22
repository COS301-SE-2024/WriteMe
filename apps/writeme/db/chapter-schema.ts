import { array, boolean, object, string, TypeOf, z } from 'zod';
import { loginUserSchema } from './user-schema';


export const createChapterSchema = object({
  storyId: string({required_error: "A story is required"}),
  title: string({required_error: "Title is Required"}).max(255, "Title is too long, a maximum of 255 characters are allowed").min(3, 'title should be at least 3 characters long.'),
  brief: string().max(40, "Brief is too long, a maximum of 40 characters are allowed. It's meant to challenge you...").default("").optional(),
  description: string().max(10000, "Description is too long, maximum of 10000 characters").default("").optional()
})


export const updateChapterSchema = object({
  storyId: string({required_error: "A story ID is required"}),
  id : string({required_error: "a chapter id is required"}),
  title: string({required_error: "Title is Required"}).max(255, "Title is too long, a maximum of 255 characters are allowed").min(3, 'title should be at least 3 characters long.'),
  brief: string({required_error: "brief is required"}).max(40, "Brief is too long, a maximum of 40 characters are allowed. It's meant to challenge you...").optional(),
  description: string({required_error: "description is required"}).max(10000, "Description is too long, maximum of 10000 characters").optional(),
  content: string({required_error: "content is required"}),
  cover: string({required_error: "cover needs to be present"}).url("cover should be a url to an image resource"),
  blocks: array(z.any(), {}),
  published: boolean({required_error: "published needs to be present"}),
})


export const editChapterSchema = object({
  title: string({required_error: "Title is Required"}).max(255, "Title is too long, a maximum of 255 characters are allowed").min(3, 'title should be at least 3 characters long.'),
  brief: string({required_error: "brief is required"}).max(40, "Brief is too long, a maximum of 40 characters are allowed. It's meant to challenge you...").optional(),
  description: string({required_error: "description is required"}).max(10000, "Description is too long, maximum of 10000 characters").optional(),
  published: boolean({required_error: "published needs to be present"}),
})

export type EditChapterInput = TypeOf<typeof editChapterSchema>;
