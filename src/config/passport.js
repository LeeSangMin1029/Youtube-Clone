import passport from 'passport';
import config from './index';
import OAuth2Strategy from 'passport-google-oauth20';

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
      callbackURL: 'http://localhost:3000/auth/google/token',
    },
    function (_, __, profile, done) {
      return done(null, profile);
    }
  )
);
