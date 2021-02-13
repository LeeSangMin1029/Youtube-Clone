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

export { ash, joinDir };
