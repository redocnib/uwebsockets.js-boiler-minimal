const path = require('path')
const nodeExternals = require('webpack-node-externals')
const getProjectRoot = require('./utils/getProjectRoot')
const PROJECT_ROOT = getProjectRoot()
const SERVER_ROOT = path.join(PROJECT_ROOT, 'src')
const DOTENV = path.join(PROJECT_ROOT, 'toolchain', 'webpack', 'utils', 'dotenv.js')
// const CircularDependencyPlugin = require('circular-dependency-plugin')
module.exports = {
  stats: 'minimal',
  devtool: 'eval-source-map',
  mode: 'development',
  // cache: {
  //   type: 'filesystem',
  //   buildDependencies: {
  //     config: [__filename]
  //   }
  // },
  node: {
    __dirname: false
  },
  entry: {
    server: [DOTENV, path.join(SERVER_ROOT, 'app', 'server.ts')]
  },
  output: {
    filename: '[name].js',
    path: path.join(PROJECT_ROOT, 'dev'),
    libraryTarget: 'commonjs'
  },
  resolve: {
    alias: {
      'server-root': SERVER_ROOT
    },
    extensions: ['.js', '.json', '.ts'],
    unsafeCache: true,
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
}
