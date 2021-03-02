import jwt from 'jsonwebtoken';

import config from '../config';
import { setAuthCredentials } from '../services';

const localsMiddleware = (req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated();
  res.locals.currentUser = req.user;
  res.locals.imgSrc = 'static/images/';
  next();
};

const createToken = (req, res, next) => {
  const { token } = req.user;
  const jwtToken = jwt.sign({ token }, config.jwt_secret_key, {
    expiresIn: token.expires_in,
  });
  res.cookie('jwt_token', jwtToken);
  next();
};

const verifyToken = (req, res, next) => {
  try {
    const clientToken = req.cookies.jwt_token;
    const decoded = jwt.verify(clientToken, config.jwt_secret_key);
    if (decoded !== undefined) {
      res.token = decoded.token;
      next();
    } else {
      res.status(401).json({ error: 'unauthorized' });
    }
  } catch (err) {
    res.status(401).json({ error: 'token expired' });
  }
};

const credentials = (_, res, next) => {
  console.log(res.token);
  setAuthCredentials(res.token);
  next();
};

export { localsMiddleware, createToken, verifyToken, credentials };
