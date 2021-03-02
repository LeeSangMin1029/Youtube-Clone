import { ash } from '../util';
import { subscriptionHandler } from '../services';

const handler = subscriptionHandler();
const renderMain = ash(async (req, res) => {
  const data = await handler.list({ part: 'snippet', mine: true });
  console.log(data);
  return res.render('home/main');
});

export { renderMain };
