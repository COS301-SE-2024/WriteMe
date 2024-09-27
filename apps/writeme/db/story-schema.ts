import { TypeOf, object, string, boolean, z, array, date } from 'zod';
import type { Block } from '@blocknote/core';

export const createStorySchema = object({
  title: string({ required_error: 'Title is Required' })
    .max(255, 'Title is too long, a maximum of 255 characters are allowed')
    .min(3, 'title should be at least 3 characters long.'),
  brief: string().max(
    40,
    "Brief is too long, a maximum of 40 characters are allowed. It's meant to challenge you..."
  ),
  description: string().max(
    10000,
    'Description is too long, maximum of 10000 characters'
  ),
});

export const updateStorySchema = object({
  id: string({ required_error: 'a story id is required' }),
  title: string({ required_error: 'Title is Required' })
    .max(255, 'Title is too long, a maximum of 255 characters are allowed')
    .min(3, 'title should be at least 3 characters long.'),
  brief: string({ required_error: 'brief is required' }).max(
    40,
    "Brief is too long, a maximum of 40 characters are allowed. It's meant to challenge you..."
  ),
  description: string({ required_error: 'description is required' }).max(
    10000,
    'Description is too long, maximum of 10000 characters'
  ),
  content: string().optional(),
  cover: string().url('cover should be a url to an image resource').optional(),
  blocks: array(z.any(), {}).optional(),
  published: boolean().optional(),
  genre: array(z.any(), {}).optional(),
  tags: array(z.any(), {}).optional(),
});

export const writeathonSchema = object({
  // id: string({required_error: "a story id is required"}),
  title: string({ required_error: 'Title is Required' })
    .max(255, 'Title is too long, a maximum of 255 characters are allowed')
    .min(3, 'Title should be atleast 3 characters long.'),
  description: string({ required_error: 'Description is Required' })
    .max(
      10000,
      'Description is too long, a maximum of 10 000 characters are allowed'
    )
    .min(10, 'Description should be atleast 10 characters long.'),
  brief: string({ required_error: 'Brief is required' }).max(
    40,
    "Brief is too long, a maximum of 40 characters are allowed. It's meant to challenge you..."
  ),
  startDate: date({ required_error: 'The start date is required' })
    .or(z.string())
    .transform((arg) => (typeof arg == 'string' ? new Date(arg) : arg)),
  endDate: date({ required_error: 'The end date is required' })
    .or(z.string())
    .transform((arg) => (typeof arg == 'string' ? new Date(arg) : arg)),
});


export const updateWriteathonSchema = object({
  id: string({ required_error: 'a writeathon id is required' }),
  title: string({ required_error: 'Title is Required' })
    .max(255, 'Title is too long, a maximum of 255 characters are allowed')
    .min(3, 'title should be at least 3 characters long.'),
  brief: string({ required_error: 'brief is required' }).max(
    40,
    "Brief is too long, a maximum of 40 characters are allowed. It's meant to challenge you..."
  ).default(""),
  description: string({ required_error: 'description is required' }).max(
    10000,
    'Description is too long, maximum of 10000 characters'
  ).default(""),
  cover: string().url('cover should be a url to an image resource').optional(),
  startDate: date({ required_error: 'The start date is required' })
    .or(z.string())
    .transform((arg) => (typeof arg == 'string' ? new Date(arg) : arg)),
  endDate: date({ required_error: 'The end date is required' })
    .or(z.string())
    .transform((arg) => (typeof arg == 'string' ? new Date(arg) : arg)),
});

export const writeathonVote = object({
  storyId: string({ required_error: 'Story ID is required' }).uuid(),
  writeathonId: string({ required_error: 'Writeathon Id is required' }).uuid(),
  categoryId: string({ required_error: 'Category ID is required' }).uuid(),
});

export const storyWriteathonSchema = object({
  storyId: string({ required_error: 'Story ID is required' }),
  writeathonId: string({ required_error: 'Writeathon ID is required' }),
});

export const updateStoryCoverSchema = object({
  id: string({ required_error: 'a story id is required' }),
  cover: string({ required_error: 'a new cover is required' }).url(
    'cover should be a url to an image resource'
  ),
});

export const writeathonCheckSchema = object({
  util_token: string({
    required_error:
      'a untility token is required in order to access this functionality',
  }),
});
