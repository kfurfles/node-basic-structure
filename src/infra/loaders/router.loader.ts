import { createLoader } from '~/lib/loaders';

import { router } from '../http';

export const routerLoader = createLoader(async (app, env) => {
  return app.use(router);
});
