const facebookService = require('../externalClients/facebookService');
const jwtUtils = require('../utils/jwtUtils');

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
      "email": "test_user@examplemail.com"
    }
  */
  const basicAuthorization = async (userData) => {
    const userId = await usersDao.createNewUserIfNotExists(userData);
    const user = Object.assign({}, userData, { userId });
    const token = jwtUtils.signJwt(user);

    return {
      user,
      token,
    };
  };

  return {
    authorizeWithFacebook,
    basicAuthorization,
  };
};
