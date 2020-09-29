/* eslint camelcase:0 */
const { TABLES, pgClient } = require('../../database/databaseClient');
const logger = require('../utils/logger');

const findById = async userId => pgClient.select().from(TABLES.USERS).where({ userId });

const createNewUserIfNotExists = async ({
  id,
  email,
  name,
  last_name,
  first_name,
  picture,
}) => pgClient.transaction(async (trx) => {
  const { data: { url: userPicture } } = picture || {};

  try {
    const existingUserId = await trx.select('userId').from(TABLES.USERS).where({ authProviderId: id });

    if (existingUserId.length) {
      logger.info(`User with authProviderId ${id} already exists in database. Skipping`);
      return existingUserId.pop().userId;
    }

    const userId = (await trx.insert({
      authProviderId: id,
      email,
      name,
      firstName: first_name,
      lastName: last_name,
      picture: userPicture,
    }, 'userId')
      .into(TABLES.USERS)).pop();

    return userId;
  } catch (e) {
    logger.error(`Error from database while creating user: ${e}`);
    throw e;
  }
});

module.exports = {
  createNewUserIfNotExists,
  findById,
};
