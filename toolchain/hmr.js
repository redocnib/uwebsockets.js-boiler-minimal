const {emptyProjectDir} = require('./webpack/utils/pathUtils')
const webpack = require('webpack')
const config = require('./webpack/hmr.server.config')

const compile = (config, isSilent) => {
  return new Promise((resolve) => {
    const cb = (err, stats) => {
      if (err && !isSilent) {
        console.error('Webpack error:', err)
      }
      const {errors} = stats.compilation
      if (errors.length > 0 && !isSilent) {
        console.error('\n😐 :: Serve Failed :: 😐\n', errors)
      }

      if (!err && stats) {
        console.info(stats.toString())
        console.info('\n🤓 :: Please Note HMR Has Some Issues With Routes :: 🤓\n')
        resolve(true)
      } else {
        resolve(false)
      }
    }
    const compiler = webpack(config, cb)
    //compiler.run(cb)
  })
}

const buildDevelopment = async () => {
  console.log('🤘 :: Starting HMR Development Build:: 🤘')
  console.log('Clearing previous files.')
  await emptyProjectDir('dev')
  return await compile(config, false)
}

buildDevelopment()
//module.exports = {buildDevelopment}
