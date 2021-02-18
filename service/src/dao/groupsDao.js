const { TABLES, pgClient } = require('../../database/databaseClient');
const logger = require('../utils/logger');

const getGroups = async (
  query,
  { excludeGroupPass = true } = {},
) => pgClient.transaction(async (trx) => {
  try {
    const groups = await trx
      .select(
        'groupId', 
        'title', 
        'author', 
        'password', 
        'expirationDatetime',
        'createdAt',
        'updatedAt'
      )
      .from(TABLES.GROUPS)
      .where(query);

    if(!groups.length) {
      return [];
    }

    if (excludeGroupPass) {
      groups.forEach(group => {
        delete group.password
      });
    }

    return groups;
  } catch (e) {
    logger.error(`Error from database fetching group data for query: ${JSON.stringify(query)}. Error: ${e}`);
    throw e;
  }
});

const createGroup = async ({
  title,
  author,
  password,
  isProtected,
  expirationDatetime,
}) => pgClient.transaction(async (trx) => {
  try {
    const [groupId] = (await trx.insert({
      title,
      author,
      password,
      isProtected,
      expirationDatetime,
    })
      .returning(['groupId'])
      .into(TABLES.GROUPS));

    return groupId;
  } catch (e) {
    logger.error(`Error from database while creating group: ${e}`);
    throw e;
  }
});

module.exports = {
  createGroup,
  getGroups
};
