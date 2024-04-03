const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { PurgeCSSPlugin } = require('purgecss-webpack-plugin');
const glob = require('glob-all');

module.exports = {
  entry: {
    home: './js/app.js',
    lookup: './js/scripts/isitbad.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: "[name].bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader',
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
      chunks: ['home']
    }),
    new HtmlWebpackPlugin({
      template: './lookup.html',
      filename: 'lookup.html',
      chunks: ['lookup']
    }),
    new MiniCssExtractPlugin(),
  ],
};
