import { ash } from '../util';
import { googleService, userService } from '../services';

const localsMiddleware = (req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated();
  res.locals.currentUser = req.user;
  res.locals.imgSrc = 'static/images/';
  return next();
};

const createToken = (req, res, next) => {
  res.cookie('jwt_token', userService.generateJwtToken(req.user));
  return next();
};

const verifyToken = ash(async (req, res, next) => {
  if (req.cookies.jwt_token === undefined) {
    return next();
  }
  const clientToken = req.cookies.jwt_token;
  const decoded = await userService.decodeToken(clientToken);
  if (decoded.expires === true) {
    const { refresh_token } = await userService.findToken({
      owner: req.user._id,
    });
    googleService.setAuthCredentials({ refresh_token });

    return next();
  }
  if (decoded.success) {
    googleService.setAuthCredentials(decoded.token);
    return next();
  } else {
    return res.status(401).json({ error: 'unauthorized' });
  }
});

export { localsMiddleware, createToken, verifyToken };
