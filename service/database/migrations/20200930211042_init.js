/* eslint func-names: 0 */
const { TABLES, pgClient } = require('../databaseClient');

exports.up = function (knex) {
  return knex.schema
    .createTable(TABLES.USERS, (usersTable) => {
      usersTable.increments('userId').primary();
      usersTable.string('username', 60);
      usersTable.string('firstName', 30);
      usersTable.string('lastName', 30);
      usersTable.string('password', 60);
      usersTable.string('email', 60);
      usersTable.timestamp('createdAt').defaultTo(pgClient.fn.now());
      usersTable.timestamp('updatedAt').defaultTo(pgClient.fn.now());
      // Indices
      usersTable.index('userId');
      usersTable.index('username');
    })

    .createTable(TABLES.GROUPS, (groupsTable) => {
      groupsTable.increments('groupId').primary();
      groupsTable.string('title', 60);
      groupsTable.integer('author').unsigned().references(`${TABLES.USERS}.userId`)
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      groupsTable.string('password', 60);
      groupsTable.boolean('isProtected').defaultTo(false);
      groupsTable.datetime('expirationDatetime');
      groupsTable.timestamp('createdAt').defaultTo(pgClient.fn.now());
      groupsTable.timestamp('updatedAt').defaultTo(pgClient.fn.now());
    })

    .createTable(TABLES.SNIPPETS, (snippetsTable) => {
      snippetsTable.increments('snippetId').primary();
      snippetsTable.integer('groupId').unsigned().notNullable().references(`${TABLES.GROUPS}.groupId`)
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      snippetsTable.string('snippetName', 60);
      snippetsTable.string('syntax', 60);
      snippetsTable.timestamp('createdAt').defaultTo(pgClient.fn.now());
      snippetsTable.timestamp('updatedAt').defaultTo(pgClient.fn.now());
    });
};

exports.down = function (knex) {
  return knex.schema
    .dropTable(TABLES.USERS);
};
