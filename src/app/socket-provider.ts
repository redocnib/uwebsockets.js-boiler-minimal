import * as uws from 'uWebSockets.js'

const APP_PORT = parseInt(process.env.PORT ?? '4000')
const APP_HOST = process.env.HOST ?? '127.0.0.1'

export default class UWSocketProvider {
  private static instance: UWSocketProvider
  private app: uws.TemplatedApp

  private constructor() {
    this.app = uws.App()
  }

  public getApp(): uws.TemplatedApp {
    return this.app
  }

  public listen() {
    this.app.listen(APP_HOST, APP_PORT, () => {
      console.log(`Application Started on ${APP_HOST}:${APP_PORT}`)
    })
  }

  public static getInstance(): UWSocketProvider {
    if (!UWSocketProvider.instance) {
      UWSocketProvider.instance = new UWSocketProvider()
    }
    return UWSocketProvider.instance
  }
}
