import { z } from 'zod';

export const userSchema = z.object({
  id: z.number(),
  name: z.string().min(3).max(45),
  email: z.string().min(4).max(45).email(),
  password: z.string().max(20),
  phone: z.string().max(11),
  admin: z.boolean().optional().default(false),
  createdAt: z.date(),
  updatedAt: z.date(),
  deletedAt: z.date().nullish(),
});

export const UserSchemaRequest = userSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  deletedAt: true,
});

export const UserSchemaResponse = userSchema.omit({
  password: true,
  admin: true,
  // createdAt: true,
  updatedAt: true,
  deletedAt: true,
});

export const UsersSchemaRequestAll = z.array(UserSchemaResponse);

export const UserSchemaUpdate = UserSchemaRequest.partial().omit({
  admin: true,
});

export const UserSchemaSchedules = userSchema.omit({
  name: true,
  createdAt: true,
  deletedAt: true,
  email: true,
  password: true,
  updatedAt: true,
});
