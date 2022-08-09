import { UserMongoDb } from '~/infra/database/Mongodb/models';

import { UserRepository } from '../../repository';
import { ListByUsername } from './listByDocument.usecase';

const userRepo = new UserRepository(UserMongoDb.User);
export const useCaseListByDocumentHandler = new ListByUsername(userRepo);
