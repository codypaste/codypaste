import Knex from 'knex';
import { TABLES, pgClient } from '../postgres';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(TABLES.USERS, (usersTable) => {
    usersTable.increments('userId').primary().unsigned();
    usersTable.bigInteger('authProviderId');
    usersTable.text('picture');
    usersTable.string('name', 60);
    usersTable.string('firstName', 30);
    usersTable.string('lastName', 30);
    usersTable.string('email', 50);
    usersTable.timestamp('createdAt').defaultTo(pgClient.fn.now());
    usersTable.timestamp('updatedAt').defaultTo(pgClient.fn.now());
    // Indices
    usersTable.index('userId');
    usersTable.index('authProviderId');
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable(TABLES.USERS);
}
