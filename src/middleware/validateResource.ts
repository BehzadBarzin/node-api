import { NextFunction, Request, Response } from 'express';
import { AnyZodObject, Schema, ZodError } from 'zod';
import log from '../utils/logger';

const validate = (schema: Schema) => {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            schema.parse({
                body: req.body,
                query: req.query,
                params: req.params,
            });

            next();
        } catch (error) {
            if (error instanceof ZodError) {
                return res.status(400).send(error.errors);
            }
        }
    };
};

export default validate;