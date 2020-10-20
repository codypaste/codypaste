const httpMethods = require('../../enums/httpMethodsEnums');
const { AUTH_TOKEN_COOKIE } = require('../../enums/authorizationEnums');
const { userAuthMiddleware } = require('../middlewares/userAuthMiddleware');

const authorizationActivities = require('../../activities/activitiesFactory').getAuthorizationActivities;

const facebookOAuth = async (ctx, next) => {
  const { userData, token } = await authorizationActivities.authorizeWithFacebook(ctx.query);
  ctx.body = userData;
  ctx.cookies.set(AUTH_TOKEN_COOKIE, token, {
    maxAge: 86400000, // 1 day
  });
  return next();
};

const verifyJwt = async (ctx, next) => {
  if (ctx.user) {
    ctx.status = 200;
  }

  return next();
};

/*
  Example payload:
  {
    "username": "test_user",
    "email": "test_user@examplemail.com",
    "password": "some secret"
  }
*/
const basicAuth = async (ctx, next) => {
  const { body: userData } = ctx.request;

  const { user, token, createdUser } = await authorizationActivities.basicAuthorization(userData);

  ctx.status = createdUser ? 201 : 200;

  ctx.body = {
    user,
    token,
  };

  ctx.cookies.set(AUTH_TOKEN_COOKIE, token, {
    maxAge: 86400000, // 1 day
  });

  return next();
};

module.exports = {
  endpointName: 'Authorization',
  prefix: '/auth',
  resourceEndpoints: [
    {
      method: httpMethods.GET,
      path: '/facebook',
      handler: facebookOAuth,
    },
    {
      method: httpMethods.GET,
      path: '/verifyJwt',
      middlewares: [userAuthMiddleware],
      handler: verifyJwt,
    },
    {
      method: httpMethods.POST,
      path: '/basic',
      handler: basicAuth,
    },
  ],
};
