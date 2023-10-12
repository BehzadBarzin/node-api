import { Express, Request, Response } from 'express';
import { createUserHandler } from './controllers/user.controller';
import validateResource from './middleware/validateResource';
import { createUserSchema } from './schemas/user.schema';
import { createUserSessionHandler, deleteUserSessionHandler, getUserSessionHandler } from './controllers/session.controller';
import { createUserSessionSchema } from './schemas/session.schema';
import { requireUser } from './middleware/requireUser';

function routes(app: Express) {
    app.get('/check', (req: Request, res: Response) => {
        res.sendStatus(200);
    });

    // -------------------------------------------------------
    // Create new user
    app.post('/api/users', validateResource(createUserSchema), createUserHandler);
    // -------------------------------------------------------
    // Create new Session (Login)
    app.post('/api/sessions', validateResource(createUserSessionSchema), createUserSessionHandler);
    // -------------------------------------------------------
    // Get all sessions for a user
    app.get('/api/sessions', requireUser, getUserSessionHandler);
    // -------------------------------------------------------    
    // Remove a user session (Logout)
    app.delete('/api/sessions', requireUser, deleteUserSessionHandler);
    // -------------------------------------------------------
}

export default routes;