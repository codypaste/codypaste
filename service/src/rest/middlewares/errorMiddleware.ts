import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';
import logger from '../../utils/logger';

type JoiErrorDetails = Joi.ValidationErrorItem[];

interface HttpException extends Error {
  status: number;
  message: string;
  details?: JoiErrorDetails;
}

/* Error catching middleware requires 4 parameters */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface JoiErrorMessage {
  type: string;
  details: JoiErrorDetails;
}

/* Error catching middleware requires 4 parameters */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const errorMiddleware = (error: HttpException, request: Request, response: Response, next: NextFunction): void => {
  let status = error.status || 500;
  let message: string | JoiErrorMessage = error.message || 'Something went wrong';

  if (Joi.isError(error)) {
    status = 422;
    message = {
      type: 'Validation error',
      details: error.details,
    };
  }

  const errorContent = {
    status,
    message,
  };

  logger.error(error, `Error occured: %o`, errorContent);

  response.status(status).json(errorContent);
};

export default errorMiddleware;
