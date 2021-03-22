import { Logger } from 'pino';
import { Token } from 'typedi';
import UsersRepository from '../domain/user/repository/users.repository';
import NotebooksRepository from '../domain/notebook/repository/notebooks.repository';

export const LOGGER = new Token<Logger>('logger');
export const USERS_REPOSITORY = new Token<typeof UsersRepository>('usersRepository');
export const NOTEBOOKS_REPOSITORY = new Token<typeof NotebooksRepository>('notebooksRepository');
