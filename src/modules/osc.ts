import configManager from "./configManager"
import { Client } from "node-osc"

class OSC {
  client: Client

  constructor () {
    this.client = new Client('127.0.0.1', configManager.config.osc.targetPort)
  }

  sendMessage (path: string, data: string | number | boolean) {
    if (!configManager.config.osc.enabled) { return }
    this.client.send(`/NowSpinnin/${path}`, data)
  }

}

export default new OSC()