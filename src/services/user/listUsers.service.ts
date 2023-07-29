import { AppDataSource, userRepo } from '../../data-source';
import { User } from '../../entities';
import { AppError } from '../../errors/error';
import {
  UserSchemaRequest,
  UserSchemaResponse,
} from '../../schemas/user.schema';

export const listUsersService = async (userId: number, id: number) => {
  const userRepository: userRepo = AppDataSource.getRepository(User);

  const user: User | null = await userRepository.findOne({
    where: {
      id: id,
    },
  });

  if (!user) {
    throw new AppError('User not found', 404);
  }

  const listUser = UserSchemaResponse.parse(user);

  return listUser;
};
