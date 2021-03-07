import passport from 'passport';
import OAuth2Strategy from 'passport-google-oauth20';

import config from './index';
import { userService } from '../services';

passport.serializeUser(function (user, done) {
  done(null, user._id);
});

passport.deserializeUser(async function (_id, done) {
  try {
    const user = await userService.findUser({ _id });
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

passport.use(
  new OAuth2Strategy.Strategy(
    {
      clientID: config.client_id,
      clientSecret: config.client_secret,
      callbackURL: config.callback_url,
    },
    async function (_, refresh_token, params, profile, done) {
      const {
        _json: { sub: google_id, name, picture: image_url, email, locale },
      } = profile;
      try {
        const user = await userService.findUser({ google_id });
        if (!user) {
          const newUser = await userService.createUser({
            google_id,
            name,
            email,
            image_url,
            locale,
          });
          await userService.createToken({
            refresh_token,
            owner: newUser._id,
            expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
          });
          return done(null, newUser);
        }

        const token = await userService.findToken({ owner: user._id });
        if (!token) {
          await userService.createToken({
            refresh_token,
            owner: user._id,
            expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
          });
        }
        user.token = params;
        return done(null, user);
      } catch (err) {
        throw new Error(err);
      }
    }
  )
);
