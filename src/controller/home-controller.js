import { ash } from '../util';
import { youtubeService } from '../services';

const handler = youtubeService.subscriptionHandler();
const renderMain = ash(async (req, res) => {
  if (req.user) {
    const { data } = await handler.list({
      part: 'snippet',
      mine: true,
    });
    const subscribedItems = data.items.map((item) => {
      const {
        resourceId: { channelId },
        thumbnails,
        title,
      } = item.snippet;
      return {
        imgSrc: thumbnails.medium.url,
        string: title,
        href: channelId,
      };
    });
    return res.render('home/main', {
      subscribedItems,
    });
  }
  return res.render('home/main');
});

export { renderMain };
