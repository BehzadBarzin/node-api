import * as z from 'zod';


export const createUserSessionSchema = z.object({
    body: z.object({
        email: z.string({
            required_error: 'Email is required.'
        }).email('Not a valid email'),
        password: z.string({
            required_error: 'Password is required',  
        }),
    }),
});

export type CreateUserSessionInput = z.TypeOf<typeof createUserSessionSchema>;

// ===================================================================================================