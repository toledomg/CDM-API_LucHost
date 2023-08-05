import { AppDataSource, userRepo } from '../../data-source';
import { User } from '../../entities';

export const deleteUserService = async (id: number): Promise<void> => {
  const userRepository: userRepo = AppDataSource.getRepository(User);

  const userData: User | null = await userRepository.findOne({
    where: {
      id: Number(id),
    },
  });

  await userRepository.remove(userData!);
};
