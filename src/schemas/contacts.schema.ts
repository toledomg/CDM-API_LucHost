import { z } from 'zod';

export const ContactSchema = z.object({
  id: z.number(),
  name: z.string().max(240),
  email: z.string().email().max(45),
  phone: z.string().max(11),
  createdAt: z.date(),
});

export const ContactSchemaRequest = ContactSchema.omit({
  id: true,
  createdAt: true,
});

export const ContactSchemaResponse = ContactSchema;

export const ContactSchemaUpdate = ContactSchemaRequest.partial();

export const ContactAllSchemaResponse = ContactSchemaResponse.array();
