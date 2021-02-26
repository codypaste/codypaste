import { Logger } from 'pino';
import createError from 'http-errors';
import { Inject, Service } from 'typedi';

import UsersRepository from '../repository/usersRepository';
import { USERS_REPOSITORY, LOGGER } from '../../../di-container/diTokens';
import { User, UserDTO } from '../types/User';

import { signJwt } from '../../../utils/jwtUtils';

@Service()
export default class UsersService {
  constructor(
    @Inject(LOGGER)
    private logger: Logger,

    @Inject(USERS_REPOSITORY)
    private usersRepository: UsersRepository
  ) {}

  async getSingle(userId: number): Promise<User> {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw createError(401, `User with id: ${userId} not found`);
    }

    return user;
  }

  async signIn(userData: UserDTO): Promise<User> {
    const userId = await this.usersRepository.insert(userData);
    const user = Object.assign({}, userData, { userId });
    const token = signJwt(user);

    return Object.assign({ userId, token }, user);
  }
}
