import { Router } from 'express';
import passport from 'passport';

import * as authController from '../controller/auth-controller';

const logout = (req, res) => {
  req.session = null;
  req.logout();
  res.redirect('/');
};
const passAuth = (options) => passport.authenticate('google', options);
const route = Router();
route.get('/logout', logout);
route.get(
  '/google',
  passAuth({
    scope: ['profile', 'email'],
  })
);
route.get('/google/code', authController.authenticate);
route.get(
  '/google/callback',
  passAuth({ failureRedirect: '/failed' }),
  authController.redirectAuthURL
);

export default route;
