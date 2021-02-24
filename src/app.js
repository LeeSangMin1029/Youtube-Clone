import express from 'express';
import mongoose from 'mongoose';

import config from './config';
import loader from './loaders';

const startServer = async () => {
  try {
    await mongoose.connect(config.mongod_db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Mongodb connected!');
    const app = express();
    app.listen(config.port, () => {
      console.log(
        `${process.env.NODE_ENV} Mode and Server running at ${config.base}`
      );
    });
    await loader(app);
  } catch (err) {
    console.err(err);
  }
};

startServer();
