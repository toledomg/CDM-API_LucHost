import { NextFunction, Request, Response } from 'express';
import { ZodTypeAny } from 'zod';

export const ensureBodyIsValidMiddleware =
  (schema: ZodTypeAny, arrKeys: string[] = []) =>
  (req: Request, res: Response, next: NextFunction): Response | void => {
    const validatedBody = schema.parse(req.body);

    req.body = validatedBody;

    return next();
  };
