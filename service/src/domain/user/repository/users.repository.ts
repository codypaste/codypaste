import Knex from 'knex';
import { TABLES } from '../../../database/postgres';
import { User, UserDTO } from '../entities/User';
import { UserResourceRepository } from './usersRepository.types';

export default class UsersRepository implements UserResourceRepository {
  constructor(private pgPool: Knex) {}

  async findById(userId: number): Promise<User> {
    const [user] = await this.pgPool.select().from(TABLES.USERS).where({ userId });
    return user;
  }

  async insert(user: UserDTO): Promise<number> {
    const [userId] = await this.pgPool
      .insert(
        {
          authProviderId: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
        },
        'userId'
      )
      .into(TABLES.USERS);

    return userId;
  }
}
