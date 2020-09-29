const config = require('config');
const httpClient = require('../utils/httpClient');

const {
  clientId,
  clientSecret,
  accessTokenApiUrl,
  userDataApi,
} = config.get('facebook');

const getUserAccessToken = async (redirectUri, code) => {
  try {
    const { access_token } = await httpClient.get(accessTokenApiUrl, {
      client_id: parseInt(clientId, 10),
      redirect_uri: redirectUri,
      client_secret: clientSecret,
      code,
    });

    return access_token;
  } catch (e) {
    const err = new Error(`Unable to get user access token from Facebook API. Error: ${e}`);
    err.status = 401;
    throw err;
  }
};

const getUserData = async (accessToken) => {
  try {
    return httpClient.get(userDataApi, {
      fields: ['id', 'email', 'name', 'picture', 'first_name', 'last_name'].join(','),
      access_token: accessToken,
    });
  } catch (e) {
    const err = new Error(`Unable to get user data from Facebook API. Error: ${e}`);
    err.status = 401;
    throw err;
  }
};

module.exports = {
  getUserAccessToken,
  getUserData,
};
