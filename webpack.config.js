var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var BUILD_DIR = path.resolve(__dirname, 'public');
var APP_DIR = path.resolve(__dirname, 'src/app');

var config = {
  resolve: {
    extensions: ['.js', '.jsx', '.scss'],
    modules: ['src', 'node_modules', 'fonts'],
  },
  entry: {
    main: APP_DIR + '/index.jsx',
  },
  output: {
    publicPath: '/',
    path: BUILD_DIR,
    filename: '[name].[chunkhash].js',
  },
  module: {
    loaders: [
      {
        test: /\.jsx?/,
        loader: 'babel-loader',
        include: APP_DIR,
        query: {
          presets: ['react', 'es2015', 'stage-0', 'stage-1'],
          plugins: [
            'react-html-attrs',
            'transform-class-properties',
            'transform-decorators-legacy',
          ],
        },
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        loader: 'file-loader?name=[name].[ext]'
      },
      {
        test: /\.(scss|css|sass)$/,
        include: APP_DIR,
        loader: ExtractTextPlugin.extract(
          ['css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]',
           'sass-loader',
          ]
        ),
      },
    ],
  },
  devtool: '#inline-source-map',
  plugins: [
    // new webpack.DefinePlugin({
    //   'process.env.NODE_ENV': process.env.NODE_ENV,
    // }),
    new webpack.ProvidePlugin({
      Promise: 'es6-promise',
      fetch: 'imports-loader?this=>global!exports-loader?global.fetch!whatwg-fetch',
    }),
    new ExtractTextPlugin('[name].[chunkhash].css'),
    // new webpack.ProvidePlugin({
    //     $: 'jquery',
    //     jQuery: 'jquery',
    //   }),
    new HtmlWebpackPlugin({
      title: 'PhotoTank',
      template: 'src/app/html-template.ejs',
      filename: 'index.html',
    }),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production'),
      },
    }),
    // new webpack.optimize.UglifyJsPlugin(),
    // new webpack.optimize.AggressiveMergingPlugin(),
  ],
  devServer: {
    contentBase: path.resolve(__dirname, 'src'),
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
