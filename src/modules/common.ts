import { access, mkdir } from 'fs/promises'
import { dirname, join } from 'path'
import { exec } from 'child_process'
import { fileURLToPath } from 'url'
import { isSea } from 'node:sea'
import packageJson from './../../package.json'
import Webserver from './http'

export function _dirname () {
  if (isSea()) {
    return __dirname
  } else {
    return join(dirname(fileURLToPath(import.meta.url)), '..', '..')
  }
}

export async function OpenDefaultToPage (): Promise<string> {
  return new Promise((resolve, reject) => {
    exec(`start http://localhost:${Webserver.port}`, (err, stdout) => {
      if (err) { return reject(err) }
      return resolve(stdout)
    })
  })
}
 
export async function checkExists (path: string): Promise<boolean> {
  try {
    await access(path)
    return true
  } catch (error) {
    return false
  }
}

export async function makeDirectory (path: string) {
  await mkdir(path)
  console.log(`Made directory: ${path}`)
}

export async function setupApplication () {
  const baseFolder = join(_dirname(), `${packageJson.prettyName} data`)
  if (!(await checkExists(baseFolder))) { await makeDirectory(baseFolder) }
  
  const internalsFolder = join(baseFolder, '_internal')
  if (!(await checkExists(internalsFolder))) { await makeDirectory(internalsFolder) }
  
  const configFolder = join(baseFolder, 'config')
  if (!(await checkExists(configFolder))) { await makeDirectory(configFolder) }
}