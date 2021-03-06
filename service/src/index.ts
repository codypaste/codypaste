import 'reflect-metadata';

import express from 'express';
import initializeRestApi from './rest';
import initializeResourceRepositories from './domain';
import logger from './utils/logger';

import config from 'config';
import { connect } from './database/postgres';
const { host, port } = config.get('service');

async function startService() {
  const app = express();

  try {
    const { pgClient } = await connect();
    // setting up DI container
    initializeResourceRepositories(pgClient);
  } catch (e) {
    logger.error(e, `Error connecting to postgres database`);
    throw e;
  }

  initializeRestApi(app);

  app.listen(port, host, () => {
    logger.info(`Server started at ${host}:${port}`);
  });
}

startService().catch((e) => {
  logger.error(e, 'Unexpected error');
  process.exit(1);
});
