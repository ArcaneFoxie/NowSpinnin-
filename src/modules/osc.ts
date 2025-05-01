import { Client } from "node-osc"
import { OSC_TYPE } from "src/types/common"
import config from './configManager'
import configManager from "./configManager"

class OSC {
  client: Client

  constructor () {
    this.client = new Client('127.0.0.1', configManager.config.osc.targetPort)
  }

  parseType (value: any, type: OSC_TYPE): number | string {
    switch (type) {
      case OSC_TYPE.INT:
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        return parseInt(value, 10)
      case OSC_TYPE.FLOAT:
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        return parseFloat(value)
      case OSC_TYPE.STRING:
        return String(value)
      case OSC_TYPE.BLOB:
        throw new Error('Not Implimented')
    }
  }

  sendMessage (path: string, data: string | number | boolean) {
    if (!configManager.config.osc.enabled) { return }

    const pscPath = `/NowSpinnin/${path}`
    if (!path.startsWith('additionalData')) {
      this.client.send(pscPath, data)
    }

    if (config.config.osc.remapped[pscPath]) {
      for (const subPath of config.config.osc.remapped[pscPath]) {
        this.client.send(subPath.path, this.parseType(data, subPath.type))
      }
    }
  }

}

export default new OSC()