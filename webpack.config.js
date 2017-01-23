var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  entry: './src/index.js',
  output: { path: __dirname, filename: 'dist/bundle.js' },
  module: {
    loaders: [
      {
        test: /.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react']
        },
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader?minimize&modules&camelCase'),
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader?minimize'),
        include: /node_modules/,
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('dist/bundle.css', {
      allChunks: true,
    }),
  ],
};