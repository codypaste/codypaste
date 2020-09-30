/* eslint camelcase:0 */
const { TABLES, pgClient } = require('../../database/databaseClient');
const logger = require('../utils/logger');

const findById = async userId => pgClient.select().from(TABLES.USERS).where({ userId });

const createNewUserIfNotExists = async ({
  email,
  username,
  last_name,
  first_name,
}) => pgClient.transaction(async (trx) => {
  try {
    const existingUserId = await trx.select('userId').from(TABLES.USERS).where({ username });

    if (existingUserId.length) {
      logger.info(`User ${username} already exists in database. Skipping`);
      return existingUserId.pop().userId;
    }

    const userId = (await trx.insert({
      email,
      username,
      firstName: first_name,
      lastName: last_name,
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
