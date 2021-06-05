const webpack = require('webpack')
const path = require('path')
const nodeExternals = require('webpack-node-externals')
const { RunScriptWebpackPlugin } = require('run-script-webpack-plugin')
const getProjectRoot = require('./utils/getProjectRoot')
const PROJECT_ROOT = getProjectRoot()
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
  entry: ['webpack/hot/poll?100', './src/app/server.ts'],
  watch: true,
  watchOptions: {
    ignored: [path.join(PROJECT_ROOT, 'dev'), path.join(PROJECT_ROOT, 'dist'), '**/node_modules']
  },
  target: 'node',
  externals: [
    nodeExternals({
      allowlist: ['webpack/hot/poll?100']
    })
  ],
  mode: 'development',
  resolve: {
    extensions: ['.ts', '.js']
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin({ multiStep: true }),
    new RunScriptWebpackPlugin({ name: 'server.js', restartable: true }),
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: [`${path.join(PROJECT_ROOT, 'dev')}/*.hot-update.*`],
      dry: false,
      dangerouslyAllowCleanPatternsOutsideProject: false
    })
  ],
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: 'awesome-typescript-loader'
      },
    ]
  },
  output: {
    path: path.join(PROJECT_ROOT, 'dev'),
    filename: 'server.js',
    libraryTarget: 'commonjs'
  }
}
