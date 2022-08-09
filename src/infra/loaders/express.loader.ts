import compression from 'compression';
import cors from 'cors';
import express from 'express';
import mongoSanitize from 'express-mongo-sanitize';
import helmet from 'helmet';
import xss from 'xss-clean';
import { createLoader } from '~/lib/loaders';

export const expressLoader = createLoader(async (app, env) => {
  app.use(helmet());

  app.use(express.json());

  app.use(xss());

  app.use(mongoSanitize());

  app.use(compression());

  app.use(cors());
  app.options('*', cors());
});
