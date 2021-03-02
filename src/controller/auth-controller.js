import passport from 'passport';
import { scope } from '../services/google';

import { ash } from '../util';

const redirectHome = ash(async (_, res) => {
  return res.redirect('/');
});

const failed = ash(async (_, res) => {
  return res.send(
    '정보제공에 대해서 일부 거부를 하였기 때문에 현재 사이트에서 제공하고자 하는 콘텐츠에 온전히 접근이 불가능합니다.'
  );
});

const passScope = passport.authenticate('google', {
  accessType: 'offline',
  scope,
});

const passFailed = passport.authenticate('google', {
  failureRedirect: '/auth/failed',
});

export { redirectHome, failed, passScope, passFailed };
