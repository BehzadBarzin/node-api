import Session from "../models/session.model";

export async function createSession(userId: string, userAgent: string) {

    try {
        return await Session.create({
            user: userId,
            userAgent: userAgent,
        });
    } catch (error) {
        // Rethrow error to be caught by session.controller.ts
        throw error;
    }
    
}