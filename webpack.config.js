const webpack = require('webpack');
const path = require('path');

const source = path.resolve(__dirname, 'src', 'js');
const target = path.resolve(__dirname, 'dist');

module.exports = {
  entry: path.join(source, 'main.js'),
  output: {
    path: target,
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      { test: /\.jsx?/, include: source, loader: 'babel' }
    ]
  },
  plugins: [
    /*new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify('production')
      }
    })*/
  ]
};