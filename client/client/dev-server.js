const opn = require('opn');
const path = require('path');
const express = require('express');
const webpack = require('webpack');
const proxyMiddleware = require('http-proxy-middleware');
const webpackConfig = require('./webpack.config.js');

// default port where dev server listens for incoming traffic
const port = process.env.PORT || 8081;
// automatically open browser, if not set will be false
const autoOpenBrowser = true;
// Define HTTP proxies to your custom API backend
// https://github.com/chimurai/http-proxy-middleware
const proxyTable = {};

const app = express();
const compiler = webpack(webpackConfig);

const devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: webpackConfig.output.publicPath,
  quiet: false,
});

const hotMiddleware = require('webpack-hot-middleware')(compiler, {
  log: () => {},
});

// force page reload when html-webpack-plugin template changes
compiler.plugin('compilation', compilation => {
  compilation.plugin('html-webpack-plugin-after-emit', (data, cb) => {
    hotMiddleware.publish({ action: 'reload' });
    cb();
  });
});

// proxy api requests
Object.keys(proxyTable).forEach((context) => {
  let options = proxyTable[context];
  if (typeof options === 'string') {
    options = { target: options };
  }
  app.use(proxyMiddleware(options.filter || context, options));
});

// handle fallback for HTML5 history API
app.use(require('connect-history-api-fallback')());

// serve webpack bundle output
app.use(devMiddleware);

// enable hot-reload and state-preserving
// compilation error display
app.use(hotMiddleware);

// serve pure static assets
// var staticPath = path.posix.join(meta.dev.assetsPublicPath, meta.dev.assetsSubDirectory)
// app.use(staticPath, express.static('./static'))

console.log('> Starting dev server...');
devMiddleware.waitUntilValid(() => {
  console.log(`${'> Listening at http://localhost:'}${port}\n`);
  // when env is testing, don't need open it
  if (autoOpenBrowser && process.env.NODE_ENV !== 'testing') {
    opn(`http://localhost:${port}`);
  }
});

app.listen(port);