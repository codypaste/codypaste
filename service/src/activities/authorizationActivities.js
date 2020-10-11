const config = require('config');
const bcrypt = require('bcryptjs');
const Boom = require('@hapi/boom');

const facebookService = require('../externalClients/facebookService');
const jwtUtils = require('../utils/jwtUtils');
const logger = require('../utils/logger');

const performFacebookAuthorization = async (redirectUrl, code) => {
  const accessToken = await facebookService.getUserAccessToken(redirectUrl, code);
  return facebookService.getUserData(accessToken);
};

module.exports = (usersDao) => {
  const authorizeWithFacebook = async ({ redirectUrl, code }) => {
    if (!redirectUrl || !code) {
      const err = new Error('Invalid request. Missing mandatory parameters');
      err.status = 400;
      throw err;
    }

    const fbUserData = await performFacebookAuthorization(redirectUrl, code);
    const userId = await usersDao.createNewUserIfNotExists(fbUserData);
    const userData = Object.assign({}, fbUserData, { userId });
    const token = jwtUtils.signJwt(userData);

    return {
      userData,
      token,
    };
  };

  /*
    Example payload:
    {
      "username": "test_user",
      "email": "test_user@examplemail.com",
      "password": "some secret"
    }
  */
  const basicAuthorization = async (userData) => {
    const existingUser = await usersDao.getUser(
      { username: userData.username },
      { excludeUserPass: false },
    );

    if (!existingUser) {
      logger.info(`Authorizing new user with username: ${userData.username}`);

      const user = await usersDao.createUser(
        Object.assign({}, userData, {
          password: await bcrypt.hash(userData.password, await bcrypt.genSalt(config.get('service.saltRounds'))),
        }),
      );

      const token = jwtUtils.signJwt(user);

      return {
        user,
        token,
        createdUser: true,
      };
    }

    if (!await bcrypt.compare(userData.password, existingUser.password)) {
      throw Boom.unauthorized(`Invalid password for user ${userData.username}!`);
    }

    delete existingUser.password;

    const token = jwtUtils.signJwt(existingUser);

    return {
      user: existingUser,
      token,
      createdUser: false,
    };
  };

  return {
    authorizeWithFacebook,
    basicAuthorization,
  };
};
