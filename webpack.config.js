/* jshint esversion: 6 */

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');

const APP_DIR = path.resolve(__dirname, 'source/js');
const BUILD_DIR = path.resolve(__dirname, 'build/js');

module.exports = {
  entry: {
    app: [`${APP_DIR}/vmsnet-entry`],
  },
  output: {
    path: BUILD_DIR,
    filename: 'main.js',
  },
  devtool: 'source-map',
  watch: true,
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'postcss-loader', 'sass-loader'],
        }),
      }, {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          presets: ['env'],
        },
      },
    ],
  },
  plugins: [
    new ExtractTextPlugin('build/main.css'),
  ],
};
