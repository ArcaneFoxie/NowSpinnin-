import WebSocket, { WebSocketServer } from 'ws'
import HttpServer from './http'

class WSServer {
  server: WebSocketServer
  lastMessage: string

  constructor () {
    this.lastMessage = ''
  }

  connect () {
    this.server = new WebSocketServer({ server: HttpServer.server })

    this.server.on('connection', (ws: WebSocket) => {
      console.log('New WS connection')

      ws.on('close', () => {
        console.log('A WS connection was closed')
      })

      ws.send(this.lastMessage)
    })
  }

  close () {
    this.server.close()
  }

  broadcast (data: any) {
    this.lastMessage = JSON.stringify(data)

    this.server.clients.forEach(c => {
      if (c.readyState !== WebSocket.OPEN) { return }
      c.send(this.lastMessage)
    })
  }
}

export default new WSServer()