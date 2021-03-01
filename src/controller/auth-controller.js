import passport from 'passport';

import { ash } from '../util';

const redirectHome = ash(async (_, res) => {
  try {
    return res.redirect('/');
  } catch (err) {
    throw new Error(err);
  }
});

const failed = ash(async (req, res) => {
  return res.send(
    '정보제공에 대해서 일부 거부를 하였기 때문에 현재 사이트에서 제공하고자 하는 콘텐츠에 온전히 접근이 불가능합니다.'
  );
});

const passScope = passport.authenticate('google', {
  accessType: 'offline',
  scope:
    'profile email\
      https://www.googleapis.com/auth/youtube\
      https://www.googleapis.com/auth/youtube.force-ssl\
      https://www.googleapis.com/auth/youtube.readonly\
      https://www.googleapis.com/auth/youtubepartner',
});

const passFailed = passport.authenticate('google', {
  failureRedirect: '/auth/failed',
});

export { redirectHome, failed, passScope, passFailed };
