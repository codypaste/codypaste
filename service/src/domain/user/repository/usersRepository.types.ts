import { User, UserDTO } from '../entities/User';

export interface UserResourceRepository {
  insert(resource: UserDTO): Promise<number>;
  findById(userId: number): Promise<User>;
}
