import { TypeOf, object, string } from 'zod';


export const createStorySchema = object({
  title: string({required_error: "Title is Required"}).max(255, "Title is too long, a maximum of 255 characters are allowed").min(3, 'title should be at least 3 characters long.'),
  brief: string().max(40, "Brief is too long, a maximum of 40 characters are allowed. It's meant to challenge you..."),
  description: string().max(10000, "Description is too long, maximum of 10000 characters")
})
