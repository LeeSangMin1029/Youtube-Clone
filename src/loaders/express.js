import express from 'express';
import cors from 'cors';

import config from '../config';
import home from '../routes/home';

export default (app) => {
  app.set('view engine', 'pug');
  app.set('views', `${config.__dirname}/views`);
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use('/static', express.static(`${config.__dirname}/public`));
  // routes
  app.use('/', home);
  /// error handlers
};
