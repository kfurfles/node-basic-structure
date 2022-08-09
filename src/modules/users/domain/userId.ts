import { UniqueEntityID } from '~/Core/domain/UniqueEntityID';
import { ValueObject } from '~/Core/domain/ValueObject';
import { Guard } from '~/Core/logic/Guard';
import { Result } from '~/Core/logic/Result';

interface UserIdProps {
  value: string;
}

export class UserId extends ValueObject<UserIdProps> {
  get value(): string {
    return this.props.value;
  }

  private constructor(props: UserIdProps) {
    super(props);
  }

  public static create(id: string): Result<UniqueEntityID> {
    const nullOrUndefined = Guard.againstNullOrUndefined(id, 'id');
    const hasValidId = Guard.customValidation(
      () => id.length > 0,
      `ID can't be empty`,
    );

    const guardResult = Guard.combine([nullOrUndefined, hasValidId]);

    if (!guardResult.succeeded) {
      return Result.fail<UniqueEntityID>(guardResult.message);
    } else {
      return Result.ok<UniqueEntityID>(new UniqueEntityID(id));
    }
  }
}
