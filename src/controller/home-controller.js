import { ash } from '../util';

const renderMain = ash(async (req, res) => {
  try {
    return res.render('home/main');
  } catch (err) {
    throw new Error(err);
  }
});

export { renderMain };
