import mongoose from 'mongoose';
import { toJSON } from '~/lib/mongoose';
import { UserEmail } from '~/modules/users/domain/userEmail';

import { UserDoc } from '../interfaces';

export const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      validate(value) {
        const isValid = UserEmail.create(value);
        if (!isValid.isSuccess) {
          throw new Error('Invalid email');
        }
      },
    },
  },
  {
    timestamps: true,
    collection: 'user_app',
  },
);

// add plugin that converts mongoose to json
userSchema.plugin(toJSON);

/**
 * @typedef User
 */

export const User = mongoose.model<UserDoc>('user_app', userSchema);

export type IUserModel = typeof User;
