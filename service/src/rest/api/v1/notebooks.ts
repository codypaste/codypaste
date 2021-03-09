import { Request, Response, Router } from 'express';
import Container from 'typedi';
import asyncHandler from 'express-async-handler';

import userAuthMiddleware from '../../middlewares/userAuthMiddleware';
import NotebooksService from '../../../domain/notebook/services/notebooksService';
import logger from '../../../utils/logger';
import createHttpError from 'http-errors';

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

      try {
        const notebookId = await notebooksService.create(notebookPayload, userId);

        return res.status(201).json(notebookId);
      } catch (e) {
        logger.error(e, `Error creating new notebook`);
        throw e;
      }
    })
  );

  router.get(
    '/:notebookPublicId',
    userAuthMiddleware,
    asyncHandler(async (req: Request, res: Response) => {
      const { notebookPublicId } = req.params;
      const userId: number | null = res.locals?.user?.userId;

      const notebooksService = Container.get(NotebooksService);
      const notebook = await notebooksService.getSingleNotebook(notebookPublicId, userId);

      return res.status(200).json(notebook);
    })
  );

  router.get(
    '/',
    userAuthMiddleware,
    asyncHandler(async (req: Request, res: Response) => {
      const userId = res.locals?.user?.userId;

      const notebooksService = Container.get(NotebooksService);
      const notebooks = await notebooksService.getAllUserNotebooks(userId);

      return res.status(200).json(notebooks);
    })
  );

  return router;
};
