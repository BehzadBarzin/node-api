import { AnyKeys } from 'mongoose';
import User, { IUser } from '../models/user.model';

// ======================================================================================================
// Create a user in database
export async function createUser(input: IUser | AnyKeys<IUser>) {
    try {
        return await User.create(input);
    } catch (error) {
        // Rethrow error to be caught by user.controller.ts
        throw error;
    }
}
// ======================================================================================================
