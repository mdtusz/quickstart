const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');

const SRC_PATH = path.join(__dirname, 'src');
const BUILD_PATH = path.join(__dirname, 'build');

const js = {
  entry: path.join(SRC_PATH, 'js', 'index.js'),
  output: {
    filename: 'bundle.js',
    path: path.join(BUILD_PATH, 'js')
  },
  module: {
    rules: [{ test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' }]
  },
  resolve: {
    alias: {
      _: path.join(SRC_PATH, 'js')
    }
  },
  devtool: 'source-map'
};

const scss = {
  entry: path.join(SRC_PATH, 'scss/index.scss'),
  output: {
    filename: 'style.css',
    path: path.join(BUILD_PATH, 'css')
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          use: [
            { loader: 'css-loader' },
            {
              loader: 'postcss-loader',
              options: { plugins: () => [autoprefixer] }
            },
            { loader: 'sass-loader' }
          ]
        })
      }
    ]
  },
  plugins: [new ExtractTextPlugin('style.css')]
};

module.exports = [js, scss];
