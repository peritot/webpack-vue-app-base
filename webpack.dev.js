const path = require('path');
const chalk = require('chalk');
const webpack = require('webpack');
const { merge } = require('webpack-merge');
const common = require('./webpack.common');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');

const publicPath = path.resolve(__dirname, 'public');

const port = 3000;

module.exports = merge(common, {
  mode: 'development',
  devtool: 'source-map',
  devServer: {
    // host: '0.0.0.0',
    port: port,
    contentBase: publicPath,
    compress: true,
    historyApiFallback: true,
    hot: true,
    noInfo: true,
    quiet: true,
    stats: 'errors-only',
    proxy: {
      '/api': {
        target: 'http://localhost',
        pathRewrite: { '^/api': '' }
      }
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
      BASE_URL: JSON.stringify('/')
    }),
    new FriendlyErrorsWebpackPlugin({
      compilationSuccessInfo: {
        messages: ['App running at:', ` - Local:   ${chalk.cyan(`http://localhost:${port}/`)}`, ` - Network: ${chalk.cyan(`http://127.0.0.1:${port}/`)}`],
        notes: ['Note that the development build is not optimized.', `To create a production build, run ${chalk.cyan('npm run build')}.`]
      },
      clearConsole: true,
      additionalTransformers: [],
      additionalFormatters: []
    })
  ]
});
