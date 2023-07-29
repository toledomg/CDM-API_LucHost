import { requestLoginSchema } from './../../schemas/login.schemas';
import { ensureBodyIsValidMiddleware } from '../../middleware/ensureBodyIsValid.middleware';
import { Router } from 'express';
import { userLoginController } from '../../controllers/users/login/userLogin.controller';

export const loginRoutes: Router = Router();

loginRoutes.post(
  '',
  ensureBodyIsValidMiddleware(requestLoginSchema),
  userLoginController
);
