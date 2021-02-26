import Knex from 'knex';
import knex from 'knex';
import knexconfig from '../../knexfile';
import logger from '../utils/logger';

const environment = process.env.ENVIRONMENT === 'production' ? 'production' : 'development';

// TODO: fix direct exports required by migration
export const pgClient = knex(knexconfig[environment]);
export const TABLES = {
  USERS: 'users',
  NOTEBOOKS: 'notebooks',
};

interface PostgresConnectionProvider {
  pgClient: Knex;
  TABLES: { [key: string]: string };
}

export const connect = async (): Promise<PostgresConnectionProvider> => {
  try {
    await pgClient.raw('SELECT now()');
    logger.info(`Successfully connected to postgres database`);

    return {
      pgClient,
      TABLES,
    };
  } catch (error) {
    throw new Error('Unable to connect to Postgres via Knex. Ensure a valid connection.');
  }
};
