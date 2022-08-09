import { UniqueEntityID } from '~/Core/domain/UniqueEntityID';
import { UserDoc } from '~/infra/database/Mongodb/interfaces';

import { User } from '../domain/user';
import { UserEmail } from '../domain/userEmail';
import { IUserBase } from '../interfaces';

export function docToUser(doc: UserDoc) {
  const { _id, username, email } = doc;

  const emailOrError = UserEmail.create(email);

  if (emailOrError.isSuccess) {
    const userOrError = User.create(
      {
        email: emailOrError.getValue(),
        username,
      },
      new UniqueEntityID(_id),
    );
    return userOrError.isSuccess ? userOrError.getValue() : null;
  } else {
    return null;
  }
}

export function userToJson(user: User): IUserBase {
  const { id, email, username } = user;

  return { id: String(id.toValue()), email, username };
}
