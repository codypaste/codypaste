import Knex from 'knex';
import Container from 'typedi';
import { USERS_REPOSITORY } from '../../di-container/diTokens';
import UsersRepository from './usersRepository';

export default (pgClient: Knex): void => {
  Container.set(USERS_REPOSITORY, new UsersRepository(pgClient));
};
