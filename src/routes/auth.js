import { Router } from 'express';

import * as authController from '../controller/auth-controller';

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
  authController.redirectHome
);

export default route;
