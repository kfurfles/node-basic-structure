import basicAuth from 'express-basic-auth';
import monitor from 'express-status-monitor';
import { createLoader } from '~/lib/loaders';

export const monitorLoader = createLoader(async (app, env) => {
  if (env.monitor.enabled) {
    app.use(monitor());
    app.get(
      env.monitor.route,
      env.monitor.username
        ? basicAuth({
            users: {
              [`${env.monitor.username}`]: env.monitor.password,
            },
            challenge: true,
          })
        : (req, res, next) => next(),
      (monitor() as any).pageRoute,
    );
  }
});
