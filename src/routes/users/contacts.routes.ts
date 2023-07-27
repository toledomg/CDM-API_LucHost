import { Router } from 'express';
import { isTokenValidMiddleware } from '../../middleware/isTokenValid.middleware';
import {
  createContactController,
  listAllContactController,
  listContactController,
} from '../../controllers/contacts/contacts.controllers';

export const contactsRoutes: Router = Router();

// contactsRoutes.use(isTokenValidMiddleware);
contactsRoutes.post('', isTokenValidMiddleware, createContactController);
contactsRoutes.get('', isTokenValidMiddleware, listAllContactController);
contactsRoutes.get('/:id', isTokenValidMiddleware, listContactController);
contactsRoutes.patch('/:id');
contactsRoutes.delete('/:id');
