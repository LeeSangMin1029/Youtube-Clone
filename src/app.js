import express from 'express';
import config from './config';
import loader from './loaders';

const startServer = async () => {
  const app = express();
  app.listen(config.port, () => {
    console.log(`Server running at http://localhost:${config.port}`);
  });
  await loader(app);
};

startServer();
