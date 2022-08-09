import debug from 'debug';
import { Model } from 'mongoose';
import { UserDoc } from '~/infra/database/Mongodb/interfaces';

import { User } from '../domain/user';
import { docToUser } from '../factories';
import { IUserRepository } from '../interfaces';

const log = debug('app:modules:user:repository:user');

export class UserRepository implements IUserRepository {
  constructor(private readonly model: Model<UserDoc, {}, {}, {}, any>) {}

  async findByUsername(username: string): Promise<User[]> {
    try {
      const usernameWithoutSpecialChars = username.replace(/[^\da-zA-Z]/gi, '');

      const query = {
        username: usernameWithoutSpecialChars,
      };

      const users = await this.model.find(query);
      log(`was founded ${users.length} users`);

      return users.map((doc) => docToUser(doc));
    } catch (error: any) {
      console.log(`ERROR: ${error.message}`);
      throw new Error('Não foi possivel recuperar a lista de pacientes');
    }
  }
}
