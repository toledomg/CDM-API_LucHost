import { Router } from 'express';
import { isTokenValidMiddleware } from '../../middleware/isTokenValid.middleware';
import {
  createContactController,
  deleteContactController,
  listAllContactController,
  listContactController,
  updateContactController,
} from '../../controllers/contacts/contacts.controllers';
import { ensureEmailContactsExistMiddleware } from '../../middleware/ensureEmailContactsExist.middleware';

export const contactsRoutes: Router = Router();

// contactsRoutes.use(isTokenValidMiddleware);
contactsRoutes.post(
  '',
  isTokenValidMiddleware,
  ensureEmailContactsExistMiddleware,
  createContactController
);
contactsRoutes.get('', isTokenValidMiddleware, listAllContactController);
contactsRoutes.get('/:id', isTokenValidMiddleware, listContactController);
contactsRoutes.patch('/:id', isTokenValidMiddleware, updateContactController);
contactsRoutes.delete('/:id', isTokenValidMiddleware, deleteContactController);
