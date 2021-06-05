const {buildDevelopment} = require('./build-dev')
const {buildProduction} = require('./build-prod')

if (require.main === module) {
  if (process.argv.includes('--prod')) {
    const isDeploy = process.argv.includes('--deploy')
    buildProduction(isDeploy).then((canStart) => {
      console.info('😊 :: Running Production :: 😊\n')
      console.clear()
      require('../dist/server.js')
    })
  } else {
    buildDevelopment().then((canStart) => {
      console.info('😊 :: Running Development :: 😊\n')
      console.clear()
      require('../dev/server.js')
    })
  }
}
