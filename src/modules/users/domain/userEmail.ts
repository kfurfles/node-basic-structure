import validator from 'validator';
import { ValueObject } from '~/Core/domain/ValueObject';
import { Guard } from '~/Core/logic/Guard';
import { Result } from '~/Core/logic/Result';

interface UserEmailProps {
  value: string;
}

export class UserEmail extends ValueObject<UserEmailProps> {
  get value(): string {
    return this.props.value;
  }

  private constructor(props: UserEmailProps) {
    super(props);
  }

  public static create(email: string): Result<UserEmail> {
    const notNullOrError = Guard.againstNullOrUndefined(email, 'email');

    const validFormatOrError = Guard.customValidation(
      () => validator.isEmail(email),
      'email',
    );

    const combineResult = Guard.combine([notNullOrError, validFormatOrError]);

    if (!combineResult.succeeded) {
      return Result.fail<UserEmail>(combineResult.message);
    } else {
      return Result.ok<UserEmail>(new UserEmail({ value: email }));
    }
  }
}
