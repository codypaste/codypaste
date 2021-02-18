import { Logger } from 'pino';
import { Token } from 'typedi';
import UsersRepository from '../domain/repositories/usersRepository';

export const LOGGER = new Token<Logger>('logger');
export const USERS_REPOSITORY = new Token<typeof UsersRepository>('usersRepository');
