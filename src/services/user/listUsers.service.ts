import { requestAllUsersSchema } from './../../schemas/user.schema';
import { AppDataSource, userRepo } from '../../data-source';
import { User } from '../../entities';
import { tUserResponse } from '../../interfaces/user.interfaces';

export const listAllUsersService = async (): Promise<tUserResponse[]> => {
  const userRepository: userRepo = AppDataSource.getRepository(User);

  const users: User[] = await userRepository.find();

  const listUsers = requestAllUsersSchema.parse(users);

  return listUsers;
};
