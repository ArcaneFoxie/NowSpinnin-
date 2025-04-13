import { _dirname, baseDirectory } from './paths'
import { isSea } from 'node:sea'
import { join } from 'path'
import express, { Express } from 'express'
import http from 'http'

import config from './../routes/config'
import nowplaying from './../routes/nowplaying'


class HTTPServer {
  port: number
  server: http.Server<typeof http.IncomingMessage, typeof http.ServerResponse>
  app: Express
  publicPath: string

  constructor () {
    this.port = 4578
    
    this.app = express()
    
    // Middleware
    this.app.use(express.json())
    
    // Routes
    this.app.use('/config', config)
    this.app.use('/nowplaying', nowplaying)

    this.publicPath = isSea() ? join(baseDirectory, 'public') : join(_dirname(), 'src', 'public')
    this.app.use('/public', express.static(this.publicPath))

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