import { ash } from '../util';
import { getAPIData, oauth2Client } from '../services/youtube-api';

const renderMain = ash(async (req, res) => {
  try {
    const {
      data: { items },
    } = await getAPIData({
      auth: oauth2Client,
      mine: true,
      part: 'snippet',
    });
    const subscribed = items.map((item) => {
      const {
        snippet: { channelId, title, thumbnails },
      } = item;
      return {
        href: `/${channelId}`,
        string: title,
        imgSrc: thumbnails.default.url,
      };
    });
    return res.render('home/main', { subscribed });
  } catch (err) {
    throw new Error(err);
  }
});

export { renderMain };
