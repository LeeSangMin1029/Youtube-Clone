import { ash } from '../util';

const home = ash(async (req, res) => {
  try {
    return res.render('home/main');
  } catch (err) {
    throw new Error(err);
  }
});

export { home };
