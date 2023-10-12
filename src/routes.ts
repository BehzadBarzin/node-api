import { Express, Request, Response } from 'express';
import { createUserHandler } from './controllers/user.controller';
import validateResource from './middleware/validateResource';
import { createUserSchema } from './schemas/user.schema';
import { createUserSessionHandler } from './controllers/session.controller';
import { createUserSessionSchema } from './schemas/session.schema';

function routes(app: Express) {
    app.get('/check', (req: Request, res: Response) => {
        res.sendStatus(200);
    });

    // -------------------------------------------------------
    // Create new user
    app.post('/api/users', validateResource(createUserSchema), createUserHandler);
    // -------------------------------------------------------
    // Create new user
    app.post('/api/sessions', validateResource(createUserSessionSchema), createUserSessionHandler);
    // -------------------------------------------------------
}

export default routes;