import { get } from 'lodash';
import { NextFunction, Request, Response } from 'express';
import { verifyJWT } from '../utils/jwt.utils';


/**
 * Find the user with the access token passed to request, and add the user object to request for ease-of-use
 */
export async function deserializeUser(req: Request, res: Response, next: NextFunction) {
    // Using lodash's get method for safer access to a property that might not exist
    let accessToken = get(req, 'headers.authorization', '');
    // Remove 'Bearer ' from the start of the access token
    accessToken = accessToken.replace(/^Bearer\s/, '');

    if (!accessToken) {
        return next();
    }

    const { decoded, expired } = verifyJWT(accessToken);

    if (decoded) {
        // Attach the user (that was encoded in JWT) to the response
        res.locals.user = decoded;
        return next();
    }
}