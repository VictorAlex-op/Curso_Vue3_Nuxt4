import z from 'zod';

export const LoginSchema = z.object({
    email: z.email('Invalid email'),
    password: z.string('Password is required').min(6,'must be at least 8 chareacters')
})

export type LoginTypeSchema = z.output<typeof LoginSchema>