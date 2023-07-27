import { z } from 'zod';
import {
  UsersSchemaRequestAll,
  UserSchemaRequest,
  UserSchemaUpdate,
  userSchema,
} from '../schemas/user.schema';
import { User } from '../entities';
import { DeepPartial, Repository } from 'typeorm';

export type tUser = z.infer<typeof userSchema>;

export type tUserRequest = z.infer<typeof UserSchemaRequest>;

export type tUserResponse = z.infer<typeof UserSchemaRequest>;

export type tAllUserResponse = z.infer<typeof UsersSchemaRequestAll>;

export type tUserUpdate = DeepPartial<tUser>;

export type tUpdateUser2 = z.infer<typeof UserSchemaUpdate>;

export const tUpdateUser = userSchema.partial();
export interface iToken {
  token: string;
}
