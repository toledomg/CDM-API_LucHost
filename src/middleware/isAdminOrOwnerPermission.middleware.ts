import { NextFunction, Request, Response } from 'express';
import { AppError } from '../errors/error';

export const isAdminOrOwnerPermissionMiddleware =
  (permission: 'admin' | 'ownerAndAdmin') =>
  (req: Request, res: Response, next: NextFunction): void => {
    const userData = res.locals.token.id;
    const userDataAdmin = res.locals.token.admin;
    const paramsId = req.params.id;

    if (permission === 'admin') {
      if (!userDataAdmin) {
        throw new AppError('Insufficient permission', 403);
      }
    }

    if (permission === 'ownerAndAdmin') {
      if (!userDataAdmin && paramsId !== userData) {
        throw new AppError('Insufficient permission', 403);
      }
    }

    next();
  };
