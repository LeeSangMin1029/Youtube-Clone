import { Router } from 'express';
import passport from 'passport';

const logout = (req, res) => {
  req.session = null;
  req.logout();
  res.redirect('/');
};

const route = Router();
route.get('/logout', logout);
route.get(
  '/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
  })
);
route.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/failed' }),
  (req, res) => {
    return res.redirect('/');
  }
);

export default route;
