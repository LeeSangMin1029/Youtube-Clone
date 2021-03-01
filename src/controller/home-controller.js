import { ash } from '../util';
import { subscriptionHandler } from '../services';

const handler = subscriptionHandler();
const renderMain = ash(async (req, res) => {
  try {
    const data = await handler.list({ part: 'snippet', mine: true });
    console.log(data);
    return res.render('home/main');
  } catch (err) {
    throw new Error(err);
  }
});

export { renderMain };
