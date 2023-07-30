import { Router } from 'express';
import { isTokenValidMiddleware } from '../../middleware/isTokenValid.middleware';
import {
  createContactController,
  deleteContactController,
  listAllContactController,
  listContactController,
  updateContactController,
} from '../../controllers/contacts/contacts.controllers';
import { ensureBodyIsValidMiddleware } from '../../middleware/ensureBodyIsValid.middleware';
import {
  ContactSchemaRequest,
  ContactSchemaUpdate,
} from '../../schemas/contacts.schema';

export const contactsRoutes: Router = Router();

contactsRoutes.post(
  '',
  ensureBodyIsValidMiddleware(ContactSchemaRequest),
  isTokenValidMiddleware,
  createContactController
);
contactsRoutes.get('', isTokenValidMiddleware, listAllContactController);
contactsRoutes.get('/:id', isTokenValidMiddleware, listContactController);
contactsRoutes.patch(
  '/:id',
  isTokenValidMiddleware,
  ensureBodyIsValidMiddleware(ContactSchemaUpdate),
  updateContactController
);
contactsRoutes.delete('/:id', isTokenValidMiddleware, deleteContactController);
