import { Request, Response } from 'express';
import {
  tContactRequest,
  tContactResponse,
} from '../../interfaces/contacts.interfaces';

import { listContactService } from './../../services/contacts/listContacts.service';
import { createContactsService } from '../../services/contacts/createContact.service';
import { listAllContactService } from '../../services/contacts/listAllContacts.service';

export const createContactController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const userId: number = parseInt(res.locals.token.id);

  const contactData: tContactRequest = req.body;

  const contact: tContactResponse = await createContactsService(
    userId,
    contactData
  );

  return res.status(201).json(contact);
};

export const listContactController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const userId: number = parseInt(res.locals.token.id);
  const contactId: number = parseInt(req.params.id);

  const contact: tContactResponse = await listContactService(userId, contactId);

  return res.status(200).json(contact);
};

export const listAllContactController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const userId: number = parseInt(res.locals.token.id);
  const contactId: number = parseInt(req.params.id);

  const contact = await listAllContactService(userId, contactId);

  return res.status(200).json(contact);
};

export const updateContactController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  return res.status(200).json();
};

export const deleteContactController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  return res.status(204).send();
};
