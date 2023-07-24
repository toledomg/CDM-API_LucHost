import { z } from 'zod';
import {
  requestAllUsersSchema,
  requestUserSchema,
  responseUserSchema,
  updateUserSchema,
  userSchema,
} from '../schemas/user.schema';
import { User } from '../entities';
import { DeepPartial, Repository } from 'typeorm';

export type tUser = z.infer<typeof userSchema>;

export type tUserRequest = z.infer<typeof requestUserSchema>;

export type tUserResponse = z.infer<typeof responseUserSchema>;

export type tAllUserResponse = z.infer<typeof requestAllUsersSchema>;

export type tUserUpdate = DeepPartial<tUser>;

export type tUpdateUser2 = z.infer<typeof updateUserSchema>;

export const tUpdateUser = userSchema.partial();
export interface iToken {
  token: string;
}
