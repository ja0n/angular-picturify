var webpack = require('webpack');

module.exports = {
  entry: "./src/angular-picturify.module.js",
  output: {
    path: __dirname + '/dist',
    filename: "angular-picturify.js"
  },
  module: {
    loaders: [
      { test: /\.js$/, loader: "transform?brfs" }
    ],
  }
};
