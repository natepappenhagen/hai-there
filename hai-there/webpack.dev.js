const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  devtool: 'cheap-module-inline-source-map',
  devServer: {
    contentBase: './dist',
    hot: true,
    historyApiFallback: true,
    inline: true,
    progress: true
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './app/index.html'
    }),
    new webpack.HotModuleReplacementPlugin(),
    new CleanWebpackPlugin(['dist'])
  ]
});
