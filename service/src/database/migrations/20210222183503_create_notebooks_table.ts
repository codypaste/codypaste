import Knex from 'knex';
import { TABLES, pgClient } from '../postgres';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(TABLES.NOTEBOOKS, (notebooksTable) => {
    notebooksTable.increments('notebookId').primary().unsigned();
    notebooksTable.integer('author').unsigned().references('userId').inTable(TABLES.USERS).onDelete('SET NULL');
    notebooksTable.string('title', 120);
    notebooksTable.string('password', 60);
    notebooksTable.dateTime('expirationDatetime');
    notebooksTable.timestamp('createdAt').defaultTo(pgClient.fn.now());
    notebooksTable.timestamp('updatedAt').defaultTo(pgClient.fn.now());
    // Indices
    notebooksTable.index('notebookId');
    notebooksTable.index('author');
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable(TABLES.NOTEBOOKS);
}
