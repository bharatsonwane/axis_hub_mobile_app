import { z } from 'zod';

export const LoginSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'Email required' })
    .regex(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/, {
      message: 'Invalid email',
    }),
  password: z.string().min(1, { message: 'Password required' }),
});

export type LoginFormData = z.infer<typeof LoginSchema>;
