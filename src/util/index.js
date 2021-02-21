import path from 'path';
import config from '../config';

const ash = (asyncFn) => {
  return async (req, res, next) => {
    try {
      return await asyncFn(req, res, next);
    } catch (error) {
      return next(error);
    }
  };
};
const joinDir = (addPath) => path.join(config.__dirname, addPath);

const isLoggedIn = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.sendStatus(401);
  }
};

export { ash, joinDir, isLoggedIn };
