const webpack = require('webpack')
const makeServersConfig = require('./webpack/prod.server.config')
const {emptyProjectDir} = require('./webpack/utils/pathUtils')

const compile = (config, isSilent) => {
  return new Promise((resolve) => {
    const cb = (err, stats) => {
      if (err && !isSilent) {
        console.error('Webpack error:', err)
      }
      const {errors} = stats.compilation
      if (errors.length > 0 && !isSilent) {
        console.error('\n😐 :: Build Failed :: 😐\n', errors)
        process.exit();
      }

      if (!err && stats) {
        console.info(stats.toString())
        console.info('\n🤓 :: Build Complete :: 🤓\n')
        resolve(true)
      } else {
        resolve(false)
      }
    }
    const compiler = webpack(config)
    compiler.run(cb)
  })
}

const buildProduction = async () => {
  console.info('🤞🥶🤞 :: Starting Production Build :: 🤞🥶🤞')
  console.log('Clearing previous files.')
  await emptyProjectDir('dist')
  const serversConfig = makeServersConfig()
  return await compile(serversConfig)
}

module.exports = {buildProduction}
