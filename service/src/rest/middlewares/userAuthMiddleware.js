const jwtUtils = require('../../utils/jwtUtils');
const { findById } = require('../../dao/usersDao');
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

  if (!authToken) {
    ctx.throw(401, 'Missing authorization token');
  }

  let userId;
  try {
    const tokenData = await jwtUtils.verify(authToken);
    userId = tokenData.userId;
  } catch (e) {
    ctx.throw(401, 'Invalid token');
  }

  try {
    const searchResults = await findById(userId);
    if (!searchResults.length) {
      ctx.throw(401, 'Unknown user');
    }

    // adding user data to koa context
    [ctx.user] = searchResults;
    logger.info(`Successfully authorized user with id ${userId}`);
  } catch (e) {
    logger.error(`Failed to fetch user with id ${userId} from database. Error: ${e}`);
    ctx.throw(401, 'Unknown user');
  }

  await next();
};
