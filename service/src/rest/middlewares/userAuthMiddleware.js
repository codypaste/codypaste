const Boom = require('@hapi/boom');

const jwtUtils = require('../../utils/jwtUtils');
const { getUser } = require('../../dao/usersDao');
const logger = require('../../utils/logger');
const {
  AUTH_TOKEN_COOKIE,
  AUTH_TOKEN_HEADER,
} = require('../../enums/authorizationEnums');

const getUserToken = (ctx) => {
  // getting auth cookie
  let userToken = ctx.cookies.get(AUTH_TOKEN_COOKIE);
  if (userToken) {
    return userToken;
  }

  // getting auth header
  userToken = ctx.request.header[AUTH_TOKEN_HEADER];
  if (userToken) {
    return userToken;
  }

  return null;
};

/*
  Middleware verifying user authorization token
  Authorized user data is set in koa context as 'user' key
*/
exports.userAuthMiddleware = async (ctx, next) => {
  const authToken = getUserToken(ctx);

  if (!authToken) { // for not logged in user
    logger.info('No token found for user');
    return next();
  }

  let tokenData;
  try {
    tokenData = await jwtUtils.verify(authToken);
  } catch (e) {
    throw Boom.unauthorized('Invalid token');
  }

  const { userId } = tokenData;

  try {
    const user = await getUser({ userId });

    if (!user) {
      throw Boom.unauthorized('Unknown user');
    }

    // adding user data to koa context
    ctx.user = user;
    logger.info(`Successfully authorized user with id ${userId}`);
  } catch (e) {
    logger.error(`Failed to fetch user with id ${userId} from database. Error: ${e}`);

    throw Boom.unauthorized('Unknown user');
  }

  await next();
};
