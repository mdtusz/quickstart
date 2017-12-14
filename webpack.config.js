const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const FlowBabelWebpackPlugin = require('flow-babel-webpack-plugin');
const autoprefixer = require('autoprefixer');

const SRC_PATH = path.join(__dirname, 'src');
const BUILD_PATH = path.join(__dirname, 'build');

const client = {
  target: 'web',
  entry: path.join(SRC_PATH, 'client', 'index.js'),
  output: {
    filename: 'bundle.js',
    path: path.join(BUILD_PATH, 'js')
  },
  module: {
    rules: [{ test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' }]
  },
  resolve: {
    alias: {
      _: path.join(SRC_PATH, 'client')
    }
  },
  plugins: [new FlowBabelWebpackPlugin()],
  devtool: 'source-map'
};

const scss = {
  entry: path.join(SRC_PATH, 'scss', 'index.scss'),
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

const server = {
  target: 'node',
  entry: path.join(SRC_PATH, 'server', 'index.js'),
  output: {
    path: path.join(BUILD_PATH, 'server'),
    filename: 'server.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  },
  resolve: {
    alias: {
      _: path.join(SRC_PATH, 'server')
    }
  },
  plugins: [new FlowBabelWebpackPlugin()]
};

module.exports = [client, scss, server];
