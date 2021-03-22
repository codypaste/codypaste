import { Request, Response, Router } from 'express';
import Container from 'typedi';
import asyncHandler from 'express-async-handler';

import UsersService from '../../../domain/user/services/authorization.service';
import userAuthMiddleware from '../../middlewares/userAuthMiddleware';

export default (prefix: string): Router => {
  const router = Router();
  router.use(prefix, router);

  router.post(
    '/basic',
    asyncHandler(async (req: Request, res: Response) => {
      const usersService = Container.get(UsersService);
      const { body: userData } = req;

      const user = await usersService.signIn(userData);

      return res.status(201).json(user);
    })
  );

  router.get(
    '/verify',
    userAuthMiddleware,
    asyncHandler(async (_, res: Response) => {
      return res.status(200).json(res.locals.user);
    })
  );

  return router;
};
