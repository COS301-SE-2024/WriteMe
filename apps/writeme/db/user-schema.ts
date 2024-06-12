import { TypeOf, object, string } from 'zod';
import { getUser } from '../services/users';

export const createUserSchema = object({
  name: string({ required_error: 'Name is required' }).min(
    1,
    'Name is required'
  ),
  email: string({ required_error: 'Email is required' })
    .min(1, 'Email is required')
    .email('Invalid email'),
  photo: string().optional(),
  password: string({ required_error: 'Password is required' })
    .min(1, 'Password is required')
    .min(8, 'Password must be more than 8 characters')
    .max(32, 'Password must be less than 32 characters'),
  passwordConfirm: string({
    required_error: 'Please confirm your password',
  }).min(1, 'Please confirm your password'),
}).refine((data) => data.password === data.passwordConfirm, {
  path: ['passwordConfirm'],
  message: 'Passwords do not match',
});

export const loginUserSchema = object({
  email: string({ required_error: 'Email is required' })
    .min(1, 'Email is required')
    .email('Invalid email or password'),
  password: string({ required_error: 'Password is required' }).min(
    1,
    'Password is required'
  ),
});

export const updateUserSchema = object({
  name: string({ required_error: 'Name is required' }).min(
    1,
    'Name is required'
  ),
  email: string({ required_error: 'Email is required' })
    .min(1, 'Email is required')
    .email('Invalid email'),
  password: string({ required_error: 'Password is required' })
  .min(1, 'Password is required')
  .min(8, 'Password must be more than 8 characters')
  .max(32, 'Password must be less than 32 characters')
  .optional(),
  bio: string().optional(),
// photo: string().optional(),
})

export const updateUserSchemaOAuth = object({
  name: string({ required_error: 'Name is required' }).min(
    1,
    'Name is required'
  ),
  email: string({ required_error: 'Email is required' })
    .min(1, 'Email is required')
    .email('Invalid email'),
  bio: string().optional(),
// photo: string().optional(),
})

export type LoginUserInput = TypeOf<typeof loginUserSchema>;
export type CreateUserInput = TypeOf<typeof createUserSchema>;
export type UpdateUserInput = TypeOf<typeof updateUserSchema>;
export type UpdateUserOAuthInput = TypeOf<typeof updateUserSchemaOAuth>;
