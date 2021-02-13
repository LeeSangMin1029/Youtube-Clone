import express from 'express';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import cors from 'cors';

import { joinDir } from '../util';
import home from '../routes/home';

import webpackConfig from '../../webpack.config';
const compiler = webpack(webpackConfig);

export default (app) => {
  app.set('view engine', 'pug');
  app.set('views', joinDir('views'));
  app.use(cors());
  app.use(
    webpackDevMiddleware(compiler, {
      publicPath: webpackConfig.output.publicPath,
    })
  );
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use('/static', express.static(joinDir('public')));
  // routes
  app.use('/', home);
  /// error handlers
};
