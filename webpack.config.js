const path = require('path');

module.exports = {
    entry: path.join(__dirname, '/client/src/app.jsx'),
    output: {
        path: path.join(__dirname, '/client/build'),
        filename: 'app.js',
    },

    module: {
        loaders: [
          {
            test: /\.jsx?$/,
            include: path.join(__dirname, '/client/src'),
            loader: 'babel-loader',
            query: {
                presets: ["react", "es2015"]
            }
          },
          {
            test: /\.(jpg|jpeg|png|gif|svg|mp4)|JPG$/,
            loader: 'url-loader',
            options: {
              limit: 25000,
            },
          }
      ]
    },
    watch: true
};
