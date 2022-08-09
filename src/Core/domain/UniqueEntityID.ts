import Mongoose from 'mongoose';
const ObjectId = Mongoose.Types.ObjectId;
import { Identifier } from './Identifier';

export class UniqueEntityID extends Identifier<string | number> {
  constructor(id?: string | number) {
    super(id ? id : ObjectId.generate().toString());
  }
}
