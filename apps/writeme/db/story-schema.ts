import { TypeOf, object, string, boolean ,z } from 'zod';
import type {Block} from '@blocknote/core'


export const createStorySchema = object({
  title: string({required_error: "Title is Required"}).max(255, "Title is too long, a maximum of 255 characters are allowed").min(3, 'title should be at least 3 characters long.'),
  brief: string().max(40, "Brief is too long, a maximum of 40 characters are allowed. It's meant to challenge you..."),
  description: string().max(10000, "Description is too long, maximum of 10000 characters")
})


export const updateStorySchema = object({
  id : string({required_error: "a story id is required"}),
  title: string({required_error: "Title is Required"}).max(255, "Title is too long, a maximum of 255 characters are allowed").min(3, 'title should be at least 3 characters long.'),
  brief: string({required_error: "brief is required"}).max(40, "Brief is too long, a maximum of 40 characters are allowed. It's meant to challenge you..."),
  description: string({required_error: "description is required"}).max(10000, "Description is too long, maximum of 10000 characters"),
  content: string({required_error: "content is required"}),
  cover: string({required_error: "cover needs to be present"}).url("cover should be a url to an image resource"),
  blocks: string({required_error: "blocks need to be present"}),
  published: boolean({required_error: "published needs to be present"}),
})
