const path = require('path')
const fs = require('fs')
const {promisify} = require('util')
const rmdir = promisify(fs.rmdir)
const getProjectRoot = require('./getProjectRoot')
const PROJECT_ROOT = getProjectRoot()

const emptyProjectDir = async (relativePath) => {
  if (!relativePath) throw 'If you continue all the files for the project will be deleted !'
  const fullPath = path.join(PROJECT_ROOT, relativePath)
  try {
    await Promise.all([rmdir(fullPath, {recursive: true})])
  } catch (_) {
    // Ignore
  }
}

module.exports = {emptyProjectDir}
