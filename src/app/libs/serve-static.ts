import fs from 'fs'
import path from 'path'
import {HttpResponse} from 'uWebSockets.js'
import pipeStreamOverResponse from './pipeStreamOverResponse'
import StaticServer from './static-server'

// __dirname should be /dev, but during HMR it becomes its true path
// so, anytime HMR reloads this file, we want to double check we're in the right place
const getProjectRoot = () => {
  let cd = __dirname
  while (cd !== '/') {
    if (
      fs.existsSync(path.join(cd, 'yarn.lock')) ||
      fs.existsSync(path.join(cd, 'package-lock.json'))
    )
      return cd
    cd = path.join(cd, '..')
  }
  return cd
}

const PROJECT_ROOT = getProjectRoot()
const staticPaths = {
  [path.join(PROJECT_ROOT, 'static')]: true
}
const filesToCache = ['sw.js', 'favicon.ico', 'manifest.json']
const staticServer = new StaticServer({staticPaths, filesToCache})

const serveStatic = (res: HttpResponse, fileName: string, allowCompressed?: boolean) => {
  const meta = staticServer.getMeta(fileName)
  if (!meta) return false
  const {size, pathname, brotliFile, file, type} = meta
  if (file) {
    res.cork(() => {
      res.writeHeader('content-type', type)
      if (allowCompressed && brotliFile) {
        res.writeHeader('content-encoding', 'br').end(brotliFile)
      } else {
        res.end(file)
      }
    })
    return true
  }
  res.writeHeader('content-type', type)
  const readStream = fs.createReadStream(pathname)
  pipeStreamOverResponse(res, readStream, size)
  return true
}

export default serveStatic
