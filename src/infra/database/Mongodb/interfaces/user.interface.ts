import { Document } from 'mongoose';

export interface IMongoDoc {
  _id: string;
}

export interface UserDoc extends Document {
  username: string;
  email: string;
}
