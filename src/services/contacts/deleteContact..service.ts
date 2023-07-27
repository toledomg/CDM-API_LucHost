import { AppDataSource } from '../../data-source';
import { Contact } from '../../entities';
import { AppError } from '../../errors/error';
import { ContactSchemaResponse } from '../../schemas/contacts.schema';

export const deleteContactService = async (
  userId: number,
  contactId: number
): Promise<void> => {
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

  await contactRepository.remove(contact);
};
