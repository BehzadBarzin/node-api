import { Request, Response } from 'express';
import log from '../utils/logger';
import { createUser } from '../services/user.service';
import { CreateUserInput } from '../schemas/user.schema';
import { Omit, omit } from 'lodash';

export async function createUserHandler(req: Request<{}, {}, CreateUserInput['body']>, res: Response) {
    try {
        const user = await createUser(req.body);

        // Send back user without password
        return res.send(omit(user.toJSON(), 'password'));
    } catch (error: any) {
        // log.error(error);
        // 409 Means conflict: we're assuming that if this function throws an error, it's because the uniqueness of email of user was violated.
        return res.status(409).send(error.message);
    }
}