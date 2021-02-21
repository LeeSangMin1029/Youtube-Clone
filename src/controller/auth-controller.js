import { ash } from '../util';

const getAccessToken = ash(async (req, res) => {
  try {
    return res.send('test');
  } catch (err) {
    throw new Error(err);
  }
});

export { getAccessToken };
