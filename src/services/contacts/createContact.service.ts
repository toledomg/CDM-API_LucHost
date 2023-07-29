import { AppDataSource } from '../../data-source';
import { User } from '../../entities';
import { Contact } from '../../entities';
import { AppError } from '../../errors/error';
import {
  tContactRequest,
  tContactResponse,
} from '../../interfaces/contacts.interfaces';
import { ContactSchemaResponse } from '../../schemas/contacts.schema';

export const createContactsService = async (
  id: number,
  contactData: tContactRequest
): Promise<tContactResponse> => {
  const contactRepository = AppDataSource.getRepository(Contact);

  const userRepository = AppDataSource.getRepository(User);

  const user: User | null = await userRepository.findOneBy({
    id: id,
  });

  if (!user) {
    throw new AppError('Client not Found', 404);
  }

  const newContact = {
    ...contactData,
    user: user,
  };

  const contact: Contact = contactRepository.create(newContact);

  await contactRepository.save(contact);

  return ContactSchemaResponse.parse(contact);
};
