import { dirname, join } from 'path'
import { fileURLToPath } from 'url'
import { isSea } from 'node:sea'
import packageJson from './../../package.json'

export function _dirname () {
  if (isSea()) {
    return __dirname
  } else {
    return join(dirname(fileURLToPath(import.meta.url)), '..', '..')
  }
}

export const baseDirectory = join(_dirname(), `${packageJson.prettyName} data`) 