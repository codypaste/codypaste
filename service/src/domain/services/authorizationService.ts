import { Logger } from 'pino';
import createError from 'http-errors';
import { Inject, Service } from 'typedi';

import UsersRepository from '../repositories/usersRepository';
import { USERS_REPOSITORY, LOGGER } from '../../di-container/diTokens';
import { IUser, IUserDTO } from '../entities/IUser';

import { signJwt } from '../../utils/jwtUtils';

@Service()
export default class UsersService {
  constructor(
    @Inject(LOGGER)
    private logger: Logger,

    @Inject(USERS_REPOSITORY)
    private usersRepository: UsersRepository
  ) {}

  async getSingle(userId: number): Promise<IUser> {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw createError(401, `User with id: ${userId} not found`);
    }

    return user;
  }

  async signIn(userData: IUserDTO): Promise<IUser> {
    const userId = await this.usersRepository.insert(userData);
    const user = Object.assign({}, userData, { userId });
    const token = signJwt(user);

    return Object.assign({ userId, token }, user);
  }
}
