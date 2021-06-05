const path = require('path')
const nodeExternals = require('webpack-node-externals')
const getProjectRoot = require('./utils/getProjectRoot')
const webpack = require('webpack')
const getWebpackPublicPath = require('./utils/getWebpackPublicPath')

const PROJECT_ROOT = getProjectRoot()
const SERVER_ROOT = path.join(PROJECT_ROOT, 'src')
const DOTENV = path.join(PROJECT_ROOT, 'toolchain/webpack/utils/dotenv.js')
const publicPath = getWebpackPublicPath()
const distPath = path.join(PROJECT_ROOT, 'dist')

module.exports = () => ({
  mode: 'production',
  stats: 'detailed',
  node: {
    __dirname: false
  },
  entry: {
    server: [DOTENV, path.join(SERVER_ROOT, 'app', 'server.ts')]
  },
  output: {
    filename: '[name].js',
    path: path.join(PROJECT_ROOT, 'dist')
  },
  optimization: {
    splitChunks: {
      chunks: 'all'
    }
  },
  resolve: {
    alias: {
      'server-root': SERVER_ROOT
    },
    extensions: ['.js', '.json', '.ts'],
    modules: [path.resolve(PROJECT_ROOT, 'node_modules')]
  },
  resolveLoader: {
    modules: [path.resolve(PROJECT_ROOT, 'node_modules')]
  },
  target: 'node',
  externals: [
    nodeExternals({
      allowlist: [/server-root/]
    })
  ],
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: 'awesome-typescript-loader'
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/,
        use: ['ignore-loader']
      }
    ]
  }
})
