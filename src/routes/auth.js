import { Router } from 'express';

import * as authController from '../controller/auth-controller';
import { createToken } from '../loaders/middlewares';

const logout = (req, res) => {
  req.session = null;
  req.logout();
  res.redirect('/');
};

const route = Router();
route.get('/failed', authController.failed);
route.get('/logout', logout);
route.get('/google', authController.passScope);
route.get(
  '/google/access',
  authController.passFailed,
  createToken,
  (_, res) => {
    return res.redirect('/');
  }
);

export default route;
