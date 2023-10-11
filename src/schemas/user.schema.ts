import * as z from 'zod';


export const createUserSchema = z.object({
    body: z.object({
        name: z.string({
            required_error: 'Name is required',
        }),
        password: z.string({
            required_error: 'Password is required',  
        }).min(6, 'Password is too short - minimum length is 6 characters.'),
        passwordConfirmation: z.string({
            required_error: 'Password Confirmation is required',  
        }),
        email: z.string({
            required_error: 'Email is required.'
        }).email('Not a valid email'),
    }).refine((data) => {
        return data.password === data.passwordConfirmation;
    }, {
        message: 'Passwords do not match',
        path: ['passwordConfirmation'],
    }),
});

export type CreateUserInput = z.TypeOf<typeof createUserSchema>;

// ===================================================================================================