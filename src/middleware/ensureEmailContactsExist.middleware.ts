import { NextFunction, Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { AppError } from '../errors/error';
import { User } from '../entities/user.entities';
import { Contact } from '../entities';

export const ensureEmailContactsExistMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const contactRepository = AppDataSource.getRepository(Contact);

  const { email } = req.body;

  if (email) {
    const emailVerify = await contactRepository.findOne({
      where: { email: email },
    });

    if (emailVerify) {
      throw new AppError('Email Contacts already exists', 409);
    }
  }

  return next();
};
