import { AppDataSource, userRepo } from '../../data-source';
import { User } from '../../entities';
import { UserSchemaRequest } from '../../schemas/user.schema';

export const listAllUsersService = async () => {
  const userRepository: userRepo = AppDataSource.getRepository(User);

  const users: User[] = await userRepository.find();

  const listUsers = UserSchemaRequest.parse(users);

  return listUsers;
};
