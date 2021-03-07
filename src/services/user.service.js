import jwt from 'jsonwebtoken';

import config from '../config';
import Token from '../models/Token';
import User from '../models/User';

const findToken = async (query = {}, select = {}) => {
  return await Token.findOne(query).select(select).lean();
};

const createToken = async (documents = {}) => {
  return await Token.create(documents);
};

const findUser = async (query = {}, select = {}) => {
  return await User.findOne(query).select(select).lean();
};

const createUser = async (documents = {}) => {
  return await User.create(documents);
};

const generateJwtToken = ({ token }) => {
  return jwt.sign({ token }, config.jwt_secret_key, {
    // expiresIn: 5,
    expiresIn: token.expires_in,
  });
};

const decodeToken = (token = {}) => {
  return new Promise((resolve) => {
    jwt.verify(token, config.jwt_secret_key, (err, decoded) => {
      if (err) {
        resolve({ expires: true });
      }
      resolve({ ...decoded, success: true });
    });
  });
};

export {
  findToken,
  createToken,
  createUser,
  findUser,
  generateJwtToken,
  decodeToken,
};
