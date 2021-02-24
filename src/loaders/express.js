// import passport from 'passport';
import express from 'express';
import cookieSession from 'cookie-session';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import cors from 'cors';

import '../config/passport';
import webpackConfig from '../../webpack.config';
import config from '../config';
import { joinDir } from '../util';
import home from '../routes/home';
import auth from '../routes/auth';

export default (app) => {
  const compiler = webpack(webpackConfig);
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
  app.use(
    cookieSession({
      name: 'default-session',
      keys: [config.cookie_key],
    })
  );
  app.use('/static', express.static(joinDir('public')));
  // app.use(passport.initialize());
  // app.use(passport.session());
  app.use(function (req, res, next) {
    res.locals.isAuthenticated = req.isAuthenticated();
    res.locals.currentUser = req.user;
    next();
  });
  // routes
  app.use('/', home);
  app.use('/auth', auth);
  /// error handlers
};
