import '../tracer'
import UWSocketProvider from './socket-provider'
import staticFileHandler from './utils/staticFileHandler'

UWSocketProvider.getInstance()
  .getApp()
  .get('/', staticFileHandler)

UWSocketProvider.getInstance()
  .getApp()
  .get('/static/*', staticFileHandler)

UWSocketProvider.getInstance()
  .getApp()
  .get('/test', (res, req) => {
    res.end('Hello World 123')
  })

UWSocketProvider.getInstance().listen()

if (module.hot) {
  module.hot.accept()
  module.hot.dispose(() => {
    console.log('HMR Dispose, Currently uws does not have a destroy hook')
  })
}
