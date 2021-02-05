import expressLoader from './express';
import sharpLoader from './sharp';

export default async (app) => {
  await sharpLoader();
  await expressLoader(app);
};
