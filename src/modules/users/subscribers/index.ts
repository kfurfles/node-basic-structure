import { useCaseListByDocumentHandler } from '../useCases';
import { AfterUserCreated } from './AfterUserCreated';

// Subscribers
new AfterUserCreated(useCaseListByDocumentHandler);
