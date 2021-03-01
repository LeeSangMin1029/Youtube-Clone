import passport from 'passport';
import OAuth2Strategy from 'passport-google-oauth20';

import config from './index';
import User from '../models/User';
import Token from '../models/Token';

passport.serializeUser(function (user, done) {
  done(null, user._id);
});

passport.deserializeUser(async function (_id, done) {
  try {
    const user = await User.findOne({ _id })
      .select({
        _id: -1,
        google_id: -1,
      })
      .lean();
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
      callbackURL: `${config.base}/auth/google/access`,
    },
    async function (access_token, refresh_token, profile, done) {
      const {
        _json: { sub: google_id, name, picture: image_url, email, locale },
      } = profile;
      try {
        const user = await User.findOne({ google_id }).lean();
        if (!user) {
          const newUser = await User.create({
            google_id,
            name,
            email,
            image_url,
            locale: locale,
          });
          await Token.create({
            refresh_token,
            owner: newUser._id,
          });
          return done(null, newUser);
        }
        const token = await Token.findOne({ owner: user._id })
          .select({ refresh_token: 1 })
          .lean();
        if (!token) {
          await Token.create({ refresh_token, owner: user._id });
        }
        return done(null, user);
      } catch (err) {
        throw new Error(err);
      }
    }
  )
);
