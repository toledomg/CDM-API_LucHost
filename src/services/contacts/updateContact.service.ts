import { AppDataSource } from '../../data-source';
import { User } from '../../entities';
import { Contact } from '../../entities';
import { AppError } from '../../errors/error';
import {
  tContact,
  tContactRequest,
  tContactResponse,
  tContactUpdate,
} from '../../interfaces/contacts.interfaces';
import { ContactSchemaResponse } from '../../schemas/contacts.schema';

export const updateContactsService = async (
  userId: number,
  contactId: number,
  contactData: tContactUpdate
): Promise<tContact> => {
  const contactRepository = AppDataSource.getRepository(Contact);

  const contact: Contact | null = await contactRepository.findOne({
    where: {
      id: contactId,
    },
    relations: ['user'],
  });

  if (!contact) {
    throw new AppError('Contact not found', 404);
  }

  if (contact.user.id !== userId) {
    throw new AppError('Insufficient permission', 401);
  }

  const contactUpdate = contactRepository.create({
    ...contact,
    ...contactData,
  });

  await contactRepository.save(contactUpdate);

  return ContactSchemaResponse.parse(contactUpdate);
};
