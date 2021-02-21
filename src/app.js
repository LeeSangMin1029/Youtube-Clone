import express from 'express';
import config from './config';
import loader from './loaders';

const startServer = async () => {
  const app = express();
  app.listen(config.port, () => {
    console.log(
      `${process.env.NODE_ENV} Mode and Server running at ${config.base}`
    );
  });
  await loader(app);
};

startServer();
