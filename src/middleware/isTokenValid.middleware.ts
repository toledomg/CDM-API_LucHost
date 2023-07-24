import { NextFunction, Request, Response } from 'express';
import { AppError } from '../errors/error';
import { verify } from 'jsonwebtoken';

export const isTokenValidMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const auth = req.headers.authorization;

  if (!auth) {
    throw new AppError('Missing bearer token', 401);
  }

  const token: string = auth.split(' ')[1];

  verify(token, String(process.env.SECRET_KEY), (err: any, decoded: any) => {
    if (err) {
      throw new AppError(err.message, 401);
    }

    res.locals.token = {
      id: decoded.sub,
      email: decoded.email,
      admin: decoded.admin,
    };

    return next();
  });
};
