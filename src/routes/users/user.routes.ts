import {
  createUserController,
  deleteUserController,
  listAllUserController,
  updateUserController,
} from '../../controllers/users/user.controller';
import { ensureBodyIsValidMiddleware } from '../../middleware/ensureBodyIsValid.middleware';
import { Router } from 'express';
import { requestUserSchema, updateUserSchema } from '../../schemas/user.schema';
import { ensureEmailExistMiddleware } from '../../middleware/ensureEmailExist.middleware';
import { isTokenValidMiddleware } from '../../middleware/isTokenValid.middleware';
import { ensureIdUserExist } from '../../middleware/ensureIdUserExist.middleware';
import { isAdminOrOwnerPermissionMiddleware } from '../../middleware/isAdminOrOwnerPermission.middleware';

export const userRoutes: Router = Router();

userRoutes.post(
  '',
  ensureEmailExistMiddleware,
  ensureBodyIsValidMiddleware(requestUserSchema),
  createUserController
);

userRoutes.get(
  '',
  isTokenValidMiddleware,
  isAdminOrOwnerPermissionMiddleware('admin'),
  listAllUserController
);

userRoutes.patch(
  '/:id',
  ensureIdUserExist,
  isTokenValidMiddleware,
  isAdminOrOwnerPermissionMiddleware('ownerAndAdmin'),
  ensureIdUserExist,
  ensureEmailExistMiddleware,
  ensureBodyIsValidMiddleware(updateUserSchema),
  updateUserController
);

userRoutes.delete(
  '/:id',
  ensureIdUserExist,
  isTokenValidMiddleware,
  isAdminOrOwnerPermissionMiddleware('admin'),
  deleteUserController
);
