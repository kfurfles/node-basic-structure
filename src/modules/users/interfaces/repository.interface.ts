import { User } from '../domain/user';

export interface IUserRepository {
  findByUsername: (username: string) => Promise<User[]>;
}
