const {buildDevelopment} = require('./build-dev')
const {buildProduction} = require('./build-prod')

if (require.main === module) {
  if (process.argv.includes('--prod')) {
    const isDeploy = process.argv.includes('--deploy')
    buildProduction(isDeploy)
  } else {
    buildDevelopment()
  }
}
