import { Request, Response } from 'express';
import {
  tAllUserResponse,
  tUserRequest,
  tUserResponse,
} from '../../interfaces/user.interfaces';
import { createUserService } from '../../services/user/createUsers.service';
import { listAllUsersService } from '../../services/user/listUsers.service';
import { updateUserService } from '../../services/user/updateUser.service';
import { deleteUserService } from '../../services/user/deleteUser.service';

export const createUserController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const userData: tUserRequest = req.body;

  const newUser = await createUserService(userData);

  return res.status(201).json(newUser);
};

export const listAllUserController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const users = await listAllUsersService();

  return res.status(200).json(users);
};

export const updateUserController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { body, params } = req;
  const { id } = params;

  const updateUserData = await updateUserService(body, Number(id));

  return res.status(200).json(updateUserData);
};

export const deleteUserController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { id } = req.params;

  await deleteUserService(Number(id));

  return res.status(204).send();
};
