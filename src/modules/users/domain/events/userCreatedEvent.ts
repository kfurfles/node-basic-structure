import { IDomainEvent } from '~/Core/domain/events/IDomainEvent';
import { UniqueEntityID } from '~/Core/domain/UniqueEntityID';
import { User } from '../user';

export class UserCreatedEvent implements IDomainEvent {
  public dateTimeOccurred: Date;
  public user: User;

  constructor(user: User) {
    this.dateTimeOccurred = new Date();
    this.user = user;
  }

  getAggregateId(): UniqueEntityID {
    return this.user.id;
  }
}
