import { compare } from 'bcryptjs';
import { AppDataSource, userRepo } from '../../../data-source';
import { User } from '../../../entities';
import { AppError } from '../../../errors/error';
import { iToken, tUserRequest } from '../../../interfaces/user.interfaces';
import { sign } from 'jsonwebtoken';

export const createTokenService = async (
  userData: tUserRequest
): Promise<iToken> => {
  const userRepository: userRepo = AppDataSource.getRepository(User);

  const userToken = await userRepository.findOne({
    where: {
      email: userData.email,
    },
  });

  if (!userToken) {
    throw new AppError('Invalid credentials', 401);
  }

  const matchPwd: boolean = await compare(
    userData.password,
    userToken.password
  );

  if (!matchPwd) {
    throw new AppError('Invalid credentials', 401);
  }

  const token: string = sign(
    {
      email: userData.email,
      admin: userToken.admin,
    },
    String(process.env.SECRET_KEY!),
    {
      subject: String(userToken.id),
      expiresIn: process.env.EXPIRES_IN,
    }
  );

  return { token };
};
