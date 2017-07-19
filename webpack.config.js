var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var BUILD_DIR = path.resolve(__dirname, 'public');
var APP_DIR = path.resolve(__dirname, 'src/client/app');

var config = {
  resolve: {
    extensions: ['.js', '.jsx', '.scss'],
    alias: {
      jquery: 'jquery/src/jquery',
    },
  },
  entry: {
    main: APP_DIR + '/index.jsx',
  },
  output: {
    publicPath: '/',
    path: BUILD_DIR,
    filename: '[name].js',
  },
  module: {

    loaders: [
      {
        test: /\.jsx?/,
        include: APP_DIR,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015', 'stage-0', 'stage-1'],
          plugins: [
            'react-html-attrs',
            'transform-class-properties',
            'transform-decorators-legacy',
          ],
        },
      },
      { test: /.(woff|woff2|eot|ttf)$/, loader: 'url-loader?prefix=font/&limit=5000', },
      { test: /\.(scss|css|sass)$/, loader: ExtractTextPlugin.extract(['css-loader', 'sass-loader']), },
    ],
  },
  devtool: '#inline-source-map',

  plugins: [
    new webpack.ProvidePlugin({
      'Promise': 'es6-promise',
      'fetch': 'imports-loader?this=>global!exports-loader?global.fetch!whatwg-fetch'
    }),
    new ExtractTextPlugin('[name].css'),
    new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
      }),
    new HtmlWebpackPlugin({
      title: 'PhotoTank',
      template: 'src/client/app/html-template.ejs',
      filename: 'index.html',
    }),
  ],

  devServer: {
    contentBase: path.resolve(__dirname, 'src/client'),
    proxy: {
      '/api': {
          target: 'http://localhost:3000',
          pathRewrite: { '': '' },
        },
    },
    historyApiFallback: true,
  },

};

module.exports = config;
