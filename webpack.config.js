import path from 'path';

import config from './src/config/index.js';

export default {
  mode: 'development',
  entry: [path.join(config.__dirname, 'public/javascripts')],
  output: {
    path: path.join(config.__dirname, 'public/dist'),
    publicPath: '/static/',
    filename: 'build.js',
  },
  watchOptions: {
    ignored: '/node_modules/',
  },
  resolve: {
    extensions: ['.js'],
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: path.join(config.__dirname, 'public'),
    port: 8000,
    hot: true,
    lazy: true,
    publicPath: '/static/',
    filename: 'build.js',
    proxy: {
      '/': 'http://localhost:3000',
    },
    overlay: true,
    open: true,
  },
};
