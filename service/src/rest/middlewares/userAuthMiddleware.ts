import { NextFunction, Request, Response } from 'express';
import createError from 'http-errors';

import { verify } from '../../utils/jwtUtils';

import authEnums from '../../enums/authorizationEnums';
import Container from 'typedi';
import logger from '../../utils/logger';
import UsersService from '../../domain/services/authorizationService';

const getUserToken = (req: Request) => {
  console.log(req.cookies);

  // getting auth cookie
  let userToken = req.cookies[authEnums.AUTH_TOKEN_COOKIE];
  if (userToken) {
    return userToken;
  }

  // getting auth header
  userToken = req.headers[authEnums.AUTH_TOKEN_HEADER];
  if (userToken) {
    return userToken;
  }

  return null;
};

const userAuthMiddleware = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
  const authToken = getUserToken(request);

  if (!authToken) {
    return next(createError(401, 'Missing authorization token'));
  }

  let userId;
  try {
    const tokenData = await verify(authToken);
    userId = tokenData.userId;
  } catch (e) {
    return next(createError(401, 'Invalid token'));
  }

  try {
    const usersService = Container.get(UsersService);
    const authorizedUser = await usersService.getSingle(userId);

    logger.info(`Successfully authorized user with id %s`, userId);
    response.locals.user = authorizedUser;

    next();
  } catch (e) {
    logger.error(`Failed to fetch user with id %s from database. Error: %o`, userId, e);
    return next(createError(401, 'Unknown user'));
  }
};

export default userAuthMiddleware;
