/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { baseDirectory } from "./paths"
import { join } from "path"
import { makeFile } from "./common"
import { readFile } from "fs/promises"
import { SELECTED_RUNNER } from "src/types/common"

interface CONFIG { selectedRunner: SELECTED_RUNNER }

export class configManager {
  private _config: CONFIG
  configFile: string

  constructor () {
    this.configFile = join(baseDirectory, 'config.json')
    
    const baseConfig = {
      selectedRunner: SELECTED_RUNNER.NONE
    }

    this._config = new Proxy(baseConfig, {
      set: (target, property, value) => {
        target[property as keyof typeof target] = value
        void this.save()
        return true
      }
    })
  }

  get config(): CONFIG {
    return this._config
  }

  set config(value: CONFIG) {
    this._config = new Proxy(value, {
      set: (target, property, value) => {
        target[property as keyof typeof target] = value
        void this.save()
        return true
      }
    })
    void this.save()
  }

  async load () {
    const loadedConfig = JSON.parse((await readFile(this.configFile)).toString())
    this.config = loadedConfig
  }

  async save () {
    await makeFile(this.configFile, JSON.stringify(this._config, null, 4))
  }
}

export default new configManager()
