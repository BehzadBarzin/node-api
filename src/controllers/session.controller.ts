import { Request, Response } from 'express';
import { validatePassword } from '../services/user.service';
import { createSession } from '../services/session.service';
import { signJWT } from '../utils/jwt.utils';
import config from 'config';
import { CreateUserSessionInput } from '../schemas/session.schema';

export async function createUserSessionHandler(req: Request<{}, {}, CreateUserSessionInput['body']>, res: Response) {
    // Validate the user's password
    const user = await validatePassword(req.body.email, req.body.password);
    
    if (!user) {
        return res.status(401).send('Invalid email or password');
    }

    // Create session
    const userAgent = req.get('user-agent') || '';
    const session = await createSession(user._id, userAgent);

    // Create an access token
    const accessToken = signJWT({
        ...user,
        session: session._id,
    }, {
        expiresIn: config.get<string>('accessTokenTimeToLive'),
    });

    // Create a refresh token
    const refreshToken = signJWT({
        ...user,
        session: session._id,
    }, {
        expiresIn: config.get<string>('refreshTokenTimeToLive'),
    });

    // return access and refresh tokens
    return res.send({
        accessToken,
        refreshToken,
    });
}