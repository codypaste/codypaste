const jwt = require('jsonwebtoken');
const config = require('config');

const { jwtSecret } = config.get('service');

const signJwt = (payload, options = {}) => jwt.sign({
  iat: Date.now(),
  ...payload,
}, jwtSecret, options);

const verify = (token, options = {}) => jwt.verify(token, jwtSecret, options);

module.exports = {
  signJwt,
  verify,
};
