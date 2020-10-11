const knex = require('knex');
const dbConfig = require('../knexfile');

const environment = process.env.ENVIRONMENT === 'development' ? 'development' : 'production';

const pgClient = knex(dbConfig[environment]);

module.exports = {
  TABLES: {
    USERS: 'users',
    GROUPS: 'groups',
    SNIPPETS: 'snippets'
  },
  pgClient,
};
