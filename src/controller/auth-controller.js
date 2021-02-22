import { ash } from '../util';
import { setToken } from '../services/youtube-api';
import { authorizeURL } from '../services/youtube-api';

const authenticate = ash(async (req, res) => {
  try {
    const { code } = req.query;
    await setToken(code);
    return res.redirect('/');
  } catch (err) {
    throw new Error(err);
  }
});

const redirectAuthURL = ash(async (_, res) => {
  return res.redirect(authorizeURL);
});

export { authenticate, redirectAuthURL };
