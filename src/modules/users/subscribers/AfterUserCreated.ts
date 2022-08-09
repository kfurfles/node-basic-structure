import { Logger } from '~/lib/logger';

import { DomainEvents } from '../../../core/domain/events/DomainEvents';
import { IHandle } from '../../../core/domain/events/IHandle';
import { UserCreatedEvent } from '../domain/events/userCreatedEvent';
import { ListByUsername } from '../useCases/ListByUsername/listByDocument.usecase';

const logger = new Logger(__filename);

export class AfterUserCreated implements IHandle<UserCreatedEvent> {
  private assignInitialUsername: ListByUsername;

  constructor(assignInitialUsername: ListByUsername) {
    this.setupSubscriptions();
    this.assignInitialUsername = assignInitialUsername;
  }

  setupSubscriptions(): void {
    logger.info(`AfterUserCreated Registered`);
    DomainEvents.register(
      this.onUserCreatedEvent.bind(this),
      UserCreatedEvent.name,
    );
  }

  private async onUserCreatedEvent(event: UserCreatedEvent): Promise<void> {
    const { user } = event;

    this.assignInitialUsername
      .execute({ username: user.username })
      .then((r) => {
        console.log(r);
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
