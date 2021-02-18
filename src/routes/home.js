import { Router } from 'express';
import passport from 'passport';

import * as homeController from '../controller/home-controller';

const route = Router();

const isLoggedIn = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.sendStatus(401);
  }
};

const sessionReset = (req, res) => {
  req.session = null;
  req.logout();
  res.redirect('/');
};

route.get('/', homeController.home);

route.get('/auth/failed', (req, res) => res.send('You failed to log in'));

route.get('/auth/success', isLoggedIn, (req, res) =>
  res.send(`Welcome mr ${req.user._json.email}`)
);

route.get(
  '/auth/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
  })
);

route.get(
  '/auth/google/token',
  passport.authenticate('google', { failureRedirect: '/auth/failed' }),
  function (req, res) {
    res.redirect('/');
  }
);

route.get('/auth/logout', sessionReset);

export default route;
