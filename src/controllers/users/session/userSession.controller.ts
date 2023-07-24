import { Request, Response } from 'express';
import { createTokenService } from '../../../services/user/session/userSession.service';
import { tUserRequest } from '../../../interfaces/user.interfaces';

export const userSessionController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const userData: tUserRequest = req.body;
  const token = await createTokenService(userData);

  return res.json(token);
};
