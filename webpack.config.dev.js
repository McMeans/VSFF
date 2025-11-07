const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    liveReload: true,
    hot: true,
    open: true,
    static: ['./'],
    historyApiFallback: {
      rewrites: [
        { from: /^\/404$/, to: '/404.html' }
      ]
    },
    setupMiddlewares: (middlewares, devServer) => {
      devServer.app.get('*', (req, res, next) => {
        // Serve index.html for root path and any path that starts with /
        if (req.path === '/' || req.path.startsWith('/#')) {
          res.sendFile(require('path').join(__dirname, 'index.html'));
        }
        // If the request is for a file that doesn't exist and isn't root or hash, serve 404.html
        else if (!req.path.includes('.')) {
          res.sendFile(require('path').join(__dirname, '404.html'));
        } else {
          next();
        }
      });
      return middlewares;
    },
  },
});
