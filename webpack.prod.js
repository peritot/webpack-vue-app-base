const path = require('path');
const chalk = require('chalk');
const webpack = require('webpack');
const { merge } = require('webpack-merge');
const common = require('./webpack.common');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');

const publicPath = path.resolve(__dirname, 'public');

module.exports = merge(common, {
  mode: 'production',
  devtool: 'cheap-source-map',
  stats: 'errors-only',
  output: {
    filename: 'js/[name].[contenthash:8].js',
    chunkFilename: 'js/[name].[contenthash:8].js',
  },
  module: {
    rules: [
      {
        test: /\.m?jsx?$/,
        use: [
          {
            loader: 'thread-loader',
          },
          {
            loader: 'babel-loader',
            options: {
              presets: [['@babel/preset-env', { modules: 'auto' }]],
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
      BASE_URL: JSON.stringify('/'),
    }),
    new FriendlyErrorsWebpackPlugin({
      compilationSuccessInfo: {
        messages: [`Build complete. The ${chalk.cyan('dist')} directory is ready to be deployed.`, `Check out deployment instructions at ${chalk.cyan('https://cli.vuejs.org/guide/deployment.html')}`],
      },
      clearConsole: true,
      additionalTransformers: [],
      additionalFormatters: [],
    }),
    new webpack.ids.HashedModuleIdsPlugin({
      hashDigest: 'hex',
    }),
    new HtmlWebpackPlugin({
      title: 'vue-app-base',
      template: `${publicPath}/index.html`,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        collapseBooleanAttributes: true,
        removeScriptTypeAttributes: true,
      },
    }),
  ],
});
