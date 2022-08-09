import { AggregateRoot } from '~/Core/domain/AggregateRoot';
import { UniqueEntityID } from '~/Core/domain/UniqueEntityID';
import { Guard } from '~/Core/logic/Guard';
import { Result } from '~/Core/logic/Result';

import { UserCreatedEvent } from './events/userCreatedEvent';
import { UserEmail } from './userEmail';

interface UserProps {
  username: string;
  email: UserEmail;
}

export class User extends AggregateRoot<UserProps> {
  get id(): UniqueEntityID {
    return this._id;
  }

  get username() {
    return this.props.username;
  }

  get email() {
    return this.props.email.value;
  }

  private constructor(props: UserProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create(props: UserProps, id?: UniqueEntityID): Result<User> {
    const { username } = props;

    const guardProps = [{ argument: username, argumentName: 'username' }];

    const guardResult = Guard.againstNullOrUndefinedBulk(guardProps);

    if (!guardResult.succeeded) {
      return Result.fail<User>(guardResult.message);
    } else {
      const user = new User({ ...props }, id);

      const idWasProvided = !!id;

      if (!idWasProvided) {
        user.addDomainEvent(new UserCreatedEvent(user));
      }

      return Result.ok<User>(user);
    }
  }
}
