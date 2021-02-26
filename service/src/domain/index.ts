import Knex from 'knex';
import Container from 'typedi';

import { NOTEBOOKS_REPOSITORY, USERS_REPOSITORY } from '../di-container/diTokens';
import NotebooksRepository from './notebook/repository/notebooksRepository';
import UsersRepository from './user/repository/usersRepository';

export default (pgClient: Knex): void => {
  Container.set(USERS_REPOSITORY, new UsersRepository(pgClient));
  Container.set(NOTEBOOKS_REPOSITORY, new NotebooksRepository(pgClient));
};
