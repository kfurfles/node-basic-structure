import { env } from '~/env';
import { Logger } from '~/lib/logger';

import { app } from './express';
import { router } from './infra/http';
import * as loaders from './infra/loaders';

const logger = new Logger(__filename);

loaders.expressLoader.Configure();
loaders.mongoLoader.Configure();
loaders.winstonLoader.Configure();
loaders.monitorLoader.Configure();

app.use(router);

app.listen(env.app.port, () => {
  logger.info(`Listening to port ${env.app.port}`);
});
