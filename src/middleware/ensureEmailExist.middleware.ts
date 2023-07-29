import { NextFunction, Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { AppError } from '../errors/error';
import { User } from '../entities/user.entities';

export const ensureEmailExistMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const userRepository = AppDataSource.getRepository(User);

  const { email } = req.body;

  if (email) {
    const emailVerify = await userRepository.findOne({
      where: { email: email },
    });

    if (emailVerify) {
      throw new AppError('Email already exists', 409);
    }
  }

  return next();
};
