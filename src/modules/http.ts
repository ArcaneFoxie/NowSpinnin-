import http from 'http'
import express, { Express } from 'express'

import nowplaying from './../routes/nowplaying'

class HTTPServer {
  port: number
  server: http.Server<typeof http.IncomingMessage, typeof http.ServerResponse>
  app: Express

  constructor () {
    this.port = 4578
    
    this.app = express()
    this.app.use(nowplaying)

    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    this.server = http.createServer(this.app)
  }

  connect (): Promise<void> {
    return new Promise((resolve) => {
      this.server.listen(this.port, () => {
        console.log(`Webserver listning on ${this.port}`)
        return resolve()
      })
    })
  }
}

export default new HTTPServer()