const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const UglifyJSPlugin = require('uglifyjs-webpack-plugin')

const CleanWebpackPlugin = require('clean-webpack-plugin');

const BUILD_DIR = path.resolve(__dirname, 'public');
const APP_DIR = path.resolve(__dirname, 'src/app');

var config = {
  resolve: {
    extensions: ['.js', '.jsx', '.scss', '.css'],
    modules: ['src', 'node_modules'],
    alias: {
      Fonts: path.resolve(__dirname, 'src/fonts/'),
    },
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
    rules: [
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
        test: /\.woff2$/,
        include: APP_DIR,
        use: ["url-loader"],
      },
      {
        test: /\.scss$/,
        use:  [  
          MiniCssExtractPlugin.loader,
          { loader: 'css-loader', options: { importLoaders: 1, modules: true } },
          'resolve-url-loader',
          { loader: 'sass-loader', options: { sourceMap: true } }
        ]
      },
    ],
  },
  devtool: '#inline-source-map',
  plugins: [
    
    new CleanWebpackPlugin('public', {} ),

    new webpack.ProvidePlugin({
      Promise: 'es6-promise',
      fetch: 'imports-loader?this=>global!exports-loader?global.fetch!whatwg-fetch',
    }),

    new MiniCssExtractPlugin({
      filename: 'style.[contenthash].css',
    }),

    new HtmlWebpackPlugin({
      title: 'PhotoTank',
      template: 'src/app/html-template.ejs',
      filename: 'index.html',
    }),

    new webpack.optimize.AggressiveMergingPlugin(),
  ],

  optimization: {
    minimizer: [
      new UglifyJSPlugin({
        uglifyOptions: {
          compress: {
            drop_console: true,
          }
        }
      })
    ]
  },

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
