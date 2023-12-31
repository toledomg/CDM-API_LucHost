import { AppDataSource, userRepo } from '../../data-source';
import { User } from '../../entities/user.entities';
import { tUserRequest, tUserResponse } from '../../interfaces/user.interfaces';
import { UserSchemaResponse } from '../../schemas/user.schema';

export const createUserService = async (
  userData: tUserRequest
): Promise<tUserResponse> => {
  const userRepository: userRepo = AppDataSource.getRepository(User);

  const user: User = userRepository.create(userData);

  await userRepository.save(user);

  const newUser = UserSchemaResponse.parse(user);

  return newUser;
};
