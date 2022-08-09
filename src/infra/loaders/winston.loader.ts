import expressWinston from 'express-winston';
import { format, transports } from 'winston';
import { createLoader } from '~/lib/loaders';

export const winstonLoader = createLoader(async (app, env) => {
  const transportList = [
    new transports.Console({
      level: env.log.level,
      handleExceptions: true,
      format:
        env.node !== 'development'
          ? format.combine(format.json())
          : format.combine(format.colorize(), format.simple()),
    }),
  ];
  app.use(
    expressWinston.logger({
      transports: transportList,
      format: format.combine(format.colorize(), format.json()),
    }),
  );
});
