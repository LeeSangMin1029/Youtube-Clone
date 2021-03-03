import jwt from 'jsonwebtoken';

import config from '../config';
import { ash } from '../util';
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
  return next();
};

const decodeToken = async (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, config.jwt_secret_key, (err, decoded) => {
      if (err) {
        reject(err);
      }
      resolve(decoded);
    });
  });
};

const verifyToken = ash(async (req, res, next) => {
  if (req.cookies.jwt_token === undefined) {
    return next();
  }
  const clientToken = req.cookies.jwt_token;
  try {
    const decoded = await decodeToken(clientToken);
    if (decoded !== undefined) {
      res.token = decoded.token;
      return next();
    } else {
      return res.status(401).json({ error: 'unauthorized' });
    }
  } catch (err) {
    return res.redirect('/auth/google');
  }
});

const credentials = (_, res, next) => {
  if (res.token === undefined) {
    return next();
  }
  setAuthCredentials(res.token);
  return next();
};

export { localsMiddleware, createToken, verifyToken, credentials };
