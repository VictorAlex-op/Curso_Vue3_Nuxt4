import z from 'zod';

export const RegisterSchema = z.object({
    email: z.email('Invalid email'),
    username: z.string(),
    password: z.string('Password is required').min(6,'must be at least 8 chareacters')
})

export type RegisterTypeSchema = z.infer<typeof RegisterSchema>