import { getService } from './google';

const service = await getService('youtube', 'v3');
/**
 * Handling subscription information
 */
const subscriptionHandler = () => {
  const sub = service.subscriptions;
  return {
    list: async (options) => {
      try {
        return await sub.list(options);
      } catch (err) {
        console.error(err);
      }
    },
  };
};

export { subscriptionHandler };
