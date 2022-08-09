import { Left, left, Right, right } from 'fp-ts/Either';
import { UseCase } from '~/Core/domain/UseCase';

import { userToJson } from '../../factories';
import { IUseCaseListByDocumentParam, IUserBase, IUserRepository } from '../../interfaces';

type ResultType = IUserBase[];
type ErrorType = 'InternalError' | 'EmptyDocumentError';

export type ResponseListByUsername = Promise<
  Left<ErrorType> | Right<ResultType>
>;

export class ListByUsername
  implements UseCase<IUseCaseListByDocumentParam, ResponseListByUsername>
{
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(request?: IUseCaseListByDocumentParam): ResponseListByUsername {
    try {
      const { username = '' } = request;
      if (username === '') {
        return left('EmptyDocumentError');
      }

      const users = (await this.userRepository.findByUsername(username)).map(
        (u) => userToJson(u),
      );

      return right(users);
    } catch (error) {
      return left('InternalError');
    }
  }
}
