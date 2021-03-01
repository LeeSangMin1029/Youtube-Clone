import { getService, oauth2Client } from './google';

const service = await getService('youtube', 'v3');
/**
 * Handling subscription information
 */
const subscriptionHandler = () => {
  const sub = service.subscriptions;
  return {
    list: async (options) => {
      try {
        return await sub.list({ auth: oauth2Client, ...options });
      } catch (err) {
        console.error(err);
      }
    },
  };
};

export { subscriptionHandler };
