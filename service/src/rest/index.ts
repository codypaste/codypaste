import { Router, Express } from 'express';
import bodyParser from 'body-parser';
import createError from 'http-errors';
import cookieParser from 'cookie-parser';

import authRouter from './api/v1/auth';
import notebooksRouter from './api/v1/notebooks';
import metaRouter from './api/meta';
import apiDocs from './api/apiDocs';

import errorMiddleware from './middlewares/errorMiddleware';

export default (app: Express): Router => {
  // registering global middlewares
  app.use(bodyParser.json());
  app.use(cookieParser());

  app.use('/', metaRouter());
  app.use('/api', apiDocs());

  // service resources api
  app.use('/api/v1', authRouter('/auth'));
  app.use('/api/v1', notebooksRouter('/notebooks'));

  // error handling middlewares
  app.use((req, res, next) => {
    next(createError(404));
  });
  app.use(errorMiddleware);

  return app;
};
