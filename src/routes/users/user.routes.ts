import {
  createUserController,
  deleteUserController,
  listAllUserController,
  listUserController,
  updateUserController,
} from '../../controllers/users/user.controller';
import { ensureBodyIsValidMiddleware } from '../../middleware/ensureBodyIsValid.middleware';
import { Router } from 'express';
import { UserSchemaRequest, UserSchemaUpdate } from '../../schemas/user.schema';
import { ensureEmailExistMiddleware } from '../../middleware/ensureEmailExist.middleware';
import { isTokenValidMiddleware } from '../../middleware/isTokenValid.middleware';
import { ensureIdUserExist } from '../../middleware/ensureIdUserExist.middleware';
import { isAdminOrOwnerPermissionMiddleware } from '../../middleware/isAdminOrOwnerPermission.middleware';

export const userRoutes: Router = Router();

userRoutes.post(
  '',
  ensureEmailExistMiddleware,
  ensureBodyIsValidMiddleware(UserSchemaRequest),
  createUserController
);

userRoutes.get(
  '',
  isTokenValidMiddleware,
  isAdminOrOwnerPermissionMiddleware('admin'),
  listAllUserController
);

userRoutes.get(
  '/:id',
  isTokenValidMiddleware,
  isAdminOrOwnerPermissionMiddleware('ownerAndAdmin'),
  listUserController
);

userRoutes.patch(
  '/:id',
  ensureIdUserExist,
  isTokenValidMiddleware,
  isAdminOrOwnerPermissionMiddleware('ownerAndAdmin'),
  ensureIdUserExist,
  ensureEmailExistMiddleware,
  ensureBodyIsValidMiddleware(UserSchemaUpdate),
  updateUserController
);

userRoutes.delete(
  '/:id',
  ensureIdUserExist,
  isTokenValidMiddleware,
  isAdminOrOwnerPermissionMiddleware('admin'),
  deleteUserController
);
