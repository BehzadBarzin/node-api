import { FilterQuery } from "mongoose";
import Session, { ISession } from "../models/session.model";

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

// ====================================================================================

export async function findSessions(query: FilterQuery<ISession>) {
    
    try {
        return await Session.find(query).lean(); // '.lean()' will only return the object with its fields (no functions)
    } catch (error) {
        // Rethrow error to be caught by session.controller.ts
        throw error;
    }
    
}