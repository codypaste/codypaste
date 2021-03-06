import Knex from 'knex';
import Container from 'typedi';

import { NOTEBOOKS_REPOSITORY, USERS_REPOSITORY } from '../di-container/diTokens';
import NotebooksRepository from './notebook/repository/notebooks.repository';
import UsersRepository from './user/repository/users.repository';

export default (pgClient: Knex): void => {
  Container.set(USERS_REPOSITORY, new UsersRepository(pgClient));
  Container.set(NOTEBOOKS_REPOSITORY, new NotebooksRepository(pgClient));
};
