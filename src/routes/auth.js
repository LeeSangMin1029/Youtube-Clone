import { Router } from 'express';

import * as authController from '../controller/auth-controller';

const logout = (req, res) => {
  req.session = null;
  req.logout();
  res.redirect('/');
};

const route = Router();
route.get('/logout', logout);
route.get('/google', authController.redirectAuthURL);
route.get('/google/code', authController.authenticate);

export default route;
