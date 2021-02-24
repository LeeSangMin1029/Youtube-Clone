const localsMiddleware = (req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated();
  res.locals.currentUser = req.user;
  res.locals.defaultSrc = 'static/images/';
  next();
};

export { localsMiddleware };
