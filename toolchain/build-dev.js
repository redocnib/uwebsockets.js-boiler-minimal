const {emptyProjectDir} = require('./webpack/utils/pathUtils')
const webpack = require('webpack')
const config = require('./webpack/dev.server.config')

const compile = (config, isSilent) => {
  return new Promise((resolve) => {
    const cb = (err, stats) => {
      if (err && !isSilent) {
        console.error('Webpack error:', err)
      }
      const {errors} = stats.compilation
      if (errors.length > 0 && !isSilent) {
        console.error('\n😐 :: Build Failed :: 😐\n', errors)
        process.exit()
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

const buildDevelopment = async () => {
  console.log('🤘 :: Starting Development Build:: 🤘')
  console.log('Clearing previous files.')
  await emptyProjectDir('dev')
  return await compile(config, false)
}

module.exports = {buildDevelopment}
