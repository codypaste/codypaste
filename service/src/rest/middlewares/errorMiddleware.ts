import { NextFunction, Request, Response } from 'express';
import logger from '../../utils/logger';

interface HttpException extends Error {
  status: number;
  message: string;
}

/* Error catching middleware requires 4 parameters */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const errorMiddleware = (error: HttpException, request: Request, response: Response, next: NextFunction): void => {
  const status = error.status || 500;
  const message = error.message || 'Something went wrong';

  const errorContent = {
    status,
    message,
  };

  logger.error(error, `Error occured: %o`, errorContent);

  response.status(status).json(errorContent);
};

export default errorMiddleware;
