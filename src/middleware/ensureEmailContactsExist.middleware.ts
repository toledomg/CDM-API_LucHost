import { NextFunction, Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { AppError } from '../errors/error';
import { Contact } from '../entities';

export const ensureEmailContactsExistMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const contactRepository = AppDataSource.getRepository(Contact);

  const { email } = req.body;
  const userId = res.locals.token.id;

  if (email) {
    const emailVerify = await contactRepository.findOne({
      where: { email: email, user: { id: userId } },
    });

    if (emailVerify) {
      throw new AppError('Email Contacts already exists', 409);
    }
  }

  return next();
};
