import { Application } from 'express';
import { env } from '~/env';
import { app } from '~/express';

const FactoryLoader =
  (app: Application, envOS: typeof env) =>
  (context: (app: Application, envOS: typeof env) => Promise<any>) => {
    const Configure = () => {
      return context(app, envOS);
    };

    return {
      Configure,
    };
  };

export const createLoader = FactoryLoader(app, env);
