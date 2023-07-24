import { NextFunction, Request, Response } from 'express';
import { AppDataSource, userRepo } from '../data-source';

import { User } from '../entities';
import { AppError } from '../errors/error';

export const ensureIdUserExist = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const userRepository: userRepo = AppDataSource.getRepository(User);

  const { id } = req.params;

  if (id) {
    const idVerify = await userRepository.findOneBy({
      id: Number(id),
    });

    if (!idVerify) {
      throw new AppError('User not found', 404);
    }
  }

  return next();
};
