import { tUserRequest } from './../../interfaces/user.interfaces';
import { AppDataSource, userRepo } from '../../data-source';
import { User } from '../../entities';
import { tUserResponse } from '../../interfaces/user.interfaces';
import { responseUserSchema } from '../../schemas/user.schema';

export const updateUserService = async (
  body: tUserRequest,
  id: number
): Promise<tUserResponse> => {
  const userRepository: userRepo = AppDataSource.getRepository(User);

  const userData: User | null = await userRepository.findOneBy({
    id: id,
  });

  const updateUser = userRepository.create({
    ...userData,
    ...body,
  });

  await userRepository.save(updateUser);

  const responseUser = responseUserSchema.parse(updateUser);

  return responseUser;
};
