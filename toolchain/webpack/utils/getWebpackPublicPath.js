const path = require('path')

const APP_VERSION = process.env.npm_package_version
const APP_WEBPACK_PUBLIC_PATH_DEFAULT = '/public/'

module.exports = function getWebpackPublicPath() {
  return process.env?.APP_URL ?? APP_WEBPACK_PUBLIC_PATH_DEFAULT
}
