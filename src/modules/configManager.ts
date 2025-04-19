/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { baseDirectory } from "./paths"
import { CONFIG, SELECTED_RUNNER } from "src/types/common"
import { join } from "path"
import { makeFile } from "./common"
import { readFile } from "fs/promises"

const defaultConfig: CONFIG = {
  selectedRunner: SELECTED_RUNNER.NONE,
  osc: {
    enabled: false,
    targetPort: 7000,
    remapped: {}
  }
}

function deepMerge<T extends Record<string, unknown>>(target: T, source: Partial<T>): T {
  for (const key in source) {
    const sourceValue = source[key]
    const targetValue = target[key]

    if (
      typeof sourceValue === "object" &&
      sourceValue !== null &&
      !Array.isArray(sourceValue) &&
      typeof targetValue === "object" &&
      targetValue !== null &&
      !Array.isArray(targetValue)
    ) {
      target[key] = deepMerge(
        targetValue as Record<string, unknown>,
        sourceValue as Record<string, unknown>
      ) as T[typeof key]
    } else if (sourceValue !== undefined) {
      target[key] = sourceValue as T[typeof key]
    }
  }

  return target
}

export class configManager {
  private _config: CONFIG
  configFile: string

  constructor () {
    this.configFile = join(baseDirectory, 'config.json')
    this._config = { ...defaultConfig }
  }

  get config(): CONFIG {
    return this._config
  }

  set config(value: CONFIG) {
    this._config = value
    void this.save()
  }

  async load () {
    try {
      const loadedRaw = await readFile(this.configFile, "utf-8")
      const loadedConfig = JSON.parse(loadedRaw) as Partial<CONFIG>
      this._config = deepMerge({ ...defaultConfig }, loadedConfig)
    } catch (e) {
      console.warn("Error loading config, using defaults:", e)
      this._config = { ...defaultConfig }
    }
  }

  async save () {
    await makeFile(this.configFile, JSON.stringify(this._config, null, 4))
  }
}

export default new configManager()
