import { Logger } from 'pino';
import { Token } from 'typedi';
import UsersRepository from '../domain/user/repository/usersRepository';
import NotebooksRepository from '../domain/notebook/repository/notebooksRepository';

export const LOGGER = new Token<Logger>('logger');
export const USERS_REPOSITORY = new Token<typeof UsersRepository>('usersRepository');
export const NOTEBOOKS_REPOSITORY = new Token<typeof NotebooksRepository>('notebooksRepository');
