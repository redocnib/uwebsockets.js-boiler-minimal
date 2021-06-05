import {HttpRequest} from 'uWebSockets.js'

const encodingSupported = (req: HttpRequest) => req.getHeader('accept-encoding').includes('br')
export default encodingSupported
