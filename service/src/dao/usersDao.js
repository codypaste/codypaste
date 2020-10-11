/* eslint camelcase:0 */
const { TABLES, pgClient } = require('../../database/databaseClient');
const logger = require('../utils/logger');

const getUser = async (
  query,
  { excludeUserPass = true } = {},
) => pgClient.transaction(async (trx) => {
  try {
    const [existingUser] = await trx
      .select('userId', 'username', 'lastName', 'firstName', 'password', 'email')
      .from(TABLES.USERS)
      .where(query);

    if (excludeUserPass) {
      delete existingUser.password;
    }

    return existingUser;
  } catch (e) {
    logger.error(`Error from database fetching user data: ${e}`);
    throw e;
  }
});

const createUser = async ({
  email,
  username,
  lastName,
  firstName,
  password,
}) => pgClient.transaction(async (trx) => {
  try {
    const user = (await trx.insert({
      email,
      username,
      firstName,
      lastName,
      password,
    })
      .returning(['userId', 'username', 'lastName', 'firstName', 'email'])
      .into(TABLES.USERS)).pop();

    return user;
  } catch (e) {
    logger.error(`Error from database while creating user: ${e}`);
    throw e;
  }
});

module.exports = {
  getUser,
  createUser,
};
