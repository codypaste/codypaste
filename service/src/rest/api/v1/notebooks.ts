import { Request, Response, Router } from 'express';
import Container from 'typedi';
import asyncHandler from 'express-async-handler';

import userAuthMiddleware from '../../middlewares/userAuthMiddleware';
import NotebooksService from '../../../domain/notebook/services/notebooksService';

export default (prefix: string): Router => {
  const router = Router();
  router.use(prefix, router);

  router.post(
    '/',
    userAuthMiddleware,
    asyncHandler(async (req: Request, res: Response) => {
      const { body: notebookPayload } = req;
      const userId = res.locals?.user?.userId;

      const notebooksService = Container.get(NotebooksService);

      const notebookId = await notebooksService.create(notebookPayload, userId);

      return res.status(200).json(notebookId);
    })
  );

  return router;
};
