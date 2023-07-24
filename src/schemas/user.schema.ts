import { z } from 'zod';

export const userSchema = z.object({
  id: z.number(),
  name: z.string().min(3).max(45),
  email: z.string().min(4).max(45).email(),
  password: z.string().max(20),
  admin: z.boolean().optional().default(false),
  createdAt: z.string(),
  updatedAt: z.string(),
  deletedAt: z.string().nullish(),
});

export const requestUserSchema = userSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  deletedAt: true,
});

export const responseUserSchema = userSchema.omit({
  password: true,
});

export const requestAllUsersSchema = z.array(responseUserSchema);

export const updateUserSchema = requestUserSchema
  .partial()
  .omit({ admin: true });

export const userSchedulesSchema = userSchema.omit({
  name: true,
  createdAt: true,
  deletedAt: true,
  email: true,
  password: true,
  updatedAt: true,
});
