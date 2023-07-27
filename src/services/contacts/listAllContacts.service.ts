import { AppDataSource } from '../../data-source';
import { Contact } from '../../entities';
import { AppError } from '../../errors/error';
import { tContactResponse } from '../../interfaces/contacts.interfaces';
import { ContactAllSchemaResponse } from '../../schemas/contacts.schema';

export const listAllContactService = async (userId: number) => {
  const contactRepository = AppDataSource.getRepository(Contact);

  const contact: Contact[] | null = await contactRepository.find({
    where: {
      user: { id: userId },
    },
    relations: ['user'],
  });

  if (!contact) {
    throw new AppError('Contact not found', 404);
  }

  const listContact = ContactAllSchemaResponse.parse(contact);

  return listContact;
};
