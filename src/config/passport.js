import passport from 'passport';
import OAuth2Strategy from 'passport-google-oauth20';

import config from './index';

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

passport.use(
  new OAuth2Strategy.Strategy(
    {
      clientID: config.client_id,
      clientSecret: config.client_secret,
      callbackURL: `${config.base}/auth/google/callback`,
    },
    function (_, __, profile, done) {
      return done(null, profile);
    }
  )
);
