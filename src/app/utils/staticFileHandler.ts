import {HttpRequest, HttpResponse} from 'uWebSockets.js'
import encodingSupported from '../libs/encoding-supported'
import serveStatic from '../libs/serve-static'

const ROUTE = '/static/'
const staticFileHandler = async (res: HttpResponse, req: HttpRequest) => {
  const fileName = req.getUrl().slice(ROUTE.length) || 'index.html'
  const servedStatic = serveStatic(res, fileName, encodingSupported(req))
  if (servedStatic) return
  res.writeStatus('404 Not Found').end()
}

export default staticFileHandler
