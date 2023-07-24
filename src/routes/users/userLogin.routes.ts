import { ensureBodyIsValidMiddleware } from '../../middleware/ensureBodyIsValid.middleware';
import { Router } from 'express';
import { userSessionController } from '../../controllers/users/session/userSession.controller';
import { requestLoginSchema } from '../../schemas/session.schemas';

export const sessionRoutes: Router = Router();

sessionRoutes.post(
  '',
  ensureBodyIsValidMiddleware(requestLoginSchema),
  userSessionController
);
