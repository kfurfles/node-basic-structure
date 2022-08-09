import mongoose from 'mongoose';
import { createLoader } from '~/lib/loaders';
import { Logger } from '~/lib/logger';

export const mongoLoader = createLoader((app, env) => {
  const logger = new Logger(__filename);
  return mongoose
    .connect(env.db.mongodb.connection)
    .then(() => logger.info(`Connected to MongoDB`));
});
