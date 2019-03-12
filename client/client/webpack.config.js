/**
 * Created by huangjason on 2017/9/11.
 */
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin')
const CleanWebpackPlugin = require('clean-webpack-plugin');
const Visualizer = require('webpack-visualizer-plugin');
const APK = require('./package.json');
require('babel-polyfill');

function resolve(file) {
  return path.join(__dirname, file);
}

function fulfillWith2Zero(num) {
  if (num) {
    num = `${num}`;
  }
  if (!num) return '00';
  if (num.length === 1) return `0${num}`;
  return `${num}`;
}

function htmlWebpackPluginConfig() {
  function minifyConfig() {
    if (process.env.NODE_ENV !== 'production') return false;

    return {
      removeComments: false,
      removeCommentsFromCDATA: false,
      collapseInlineTagWhitespace: true,
      removeAttributeQuotes: true,
      collapseWhitespace: true,
      minifyJS: true,
      minifyCSS: true,
    };
  }

  function headerEmbedJs() {
    const buildDate = new Date();
    const BUILD_TIME = `${buildDate.getFullYear()}-${fulfillWith2Zero(buildDate.getMonth() + 1)}-${fulfillWith2Zero(buildDate.getDate())} ${fulfillWith2Zero(buildDate.getHours())}:${fulfillWith2Zero(buildDate.getMinutes())}:${fulfillWith2Zero(buildDate.getSeconds())}`;
    const apiUrlPrefix = process.env.NODE_ENV !== 'production' ? 'http://localhost:7001' : '';
    return `
      window.appConfig = {};
      appConfig.version = "${APK.version}";
      appConfig.buildTime = "${BUILD_TIME}";
      appConfig.apiUrlPrefix = "${apiUrlPrefix}";
      appConfig.showVersion = "${APK.showVersion || ''}";
      appConfig.theme = "sierra";
    `;
    // appConfig.title = "${APK.title || ''}";
    // window.document.title = appConfig.title || '';
  }

  return {
    // see default html template engine. https://github.com/blueimp/JavaScript-Templates
    filename: 'index.html',
    minify: minifyConfig(),
    headerEmbedJs: headerEmbedJs(),
    template: resolve('./src/views/index.ejs'),
    // inject: 'body',
    inject: true,
    hash: false,
    cache: false, // true,
    showErrors: true,
    chunksSortMode: 'dependency',
  };
}

const config = {
  // entry: [
  //   'babel-polyfill',
  //   resolve('./src/views/index.js'),
  // ],

  entry: {
    common: ['babel-polyfill'],
    vendor_vue: ['vue', 'vue-router', 'vuex'],
    vendor_axios: ['axios', 'vue-axios'],
    vendor_element: ['element-ui'],
    vendor_chart: ['vue-chartjs', 'chart.js'],
    vendor_permission: ['vue-permission'],
    vendor_moment: ['moment'],
    index: resolve('./src/views/index.js'),
  },

  output: {
    path: resolve('./dist'),
    chunkFilename: 'assets/js/[name].bundle.[chunkhash:10].js',
    filename: 'assets/js/[name].[hash:10].js',
    publicPath: '/',
  },

  resolve: {
    extensions: ['.js', '.vue', '.json', '.styl', 'css'],
    alias: {
      vue$: 'vue/dist/vue.esm.js',
      '@': resolve('./src'),
      '@assets': resolve('./src/assets'),
      '@components': resolve('./src/views/components'),
      '@pages': resolve('./src/views/pages'),
    },
  },

  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            css: ExtractTextPlugin.extract({
              use: 'css-loader',
              fallback: 'style-loader',
            }),
            stylus: ExtractTextPlugin.extract({
              use: ['css-loader', 'postcss-loader', 'stylus-loader'],
              fallback: 'style-loader',
            }),
            postcss: ExtractTextPlugin.extract({
              use: ['css-loader', 'postcss-loader'],
              fallback: 'style-loader',
            }),
          },
        },
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [
          resolve('src'),
        ],
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          use: ['css-loader', 'postcss-loader'],
          fallback: 'style-loader',
        }),
      },
      {
        test: /\.styl/,
        use: ExtractTextPlugin.extract({
          use: ['css-loader', 'postcss-loader', 'stylus-loader'],
          fallback: 'style-loader',
        }),
      },
      {
        test: /\.html$/,
        use: [{
          loader: 'html-loader',
          options: {
            root: resolve('src'),
            attrs: ['img:src', 'link:href'],
          },
        }],
      },
      {
        test: /\.(png|jpg|jpeg|gif|eot|ttf|woff|woff2|svg|svgz)(\?.+)?$/,
        exclude: /favicon\.png$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 10000,
            name: 'assets/img/[name].[hash:7].[ext]',
          },
        }],
      },
    ],
  },

  plugins: [
    new CleanWebpackPlugin('dist'),

    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false,
      },
    }),

    new ExtractTextPlugin({
      filename: 'assets/css/[name].[contenthash:10].css',
    }),

    new webpack.DefinePlugin(JSON.stringify({
      'process.env': {
        NODE_ENV: process.env.NODE_ENV,
      },
    })),

    process.env.NODE_ENV !== 'production' ? new webpack.HotModuleReplacementPlugin() : null,

    new HtmlWebpackPlugin(htmlWebpackPluginConfig()),

    process.env.NODE_ENV === 'production' ? new Visualizer({
      filename: './statistics.html',
    }) : null,

    new webpack.optimize.CommonsChunkPlugin({
      name: ['common', 'vendor_vue', 'vendor_axios', 'vendor_element', 'vendor_chart', 'vendor_moment'], // 指定公共 bundle 的名称。
    }),

  ].filter(val => !!val),

  devtool: process.env.NODE_ENV === 'production' ?
    false :
    'eval',
};

if (process.env.NODE_ENV !== 'production') {
  // config.entry.push('webpack-hot-middleware/client');
  config.entry.client = 'webpack-hot-middleware/client';
}

module.exports = config;
