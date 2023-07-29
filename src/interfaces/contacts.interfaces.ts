import { z } from 'zod';
import {
  ContactSchema,
  ContactSchemaRequest,
  ContactSchemaResponse,
} from '../schemas/contacts.schema';
import { DeepPartial } from 'typeorm';

export type tContact = z.infer<typeof ContactSchema>;
export type tContactRequest = z.infer<typeof ContactSchemaRequest>;
export type tContactResponse = z.infer<typeof ContactSchemaResponse>;
export type tContactUpdate = DeepPartial<tContactRequest>;
