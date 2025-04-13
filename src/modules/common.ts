import { access, mkdir, writeFile } from 'fs/promises'
import { baseDirectory } from './paths'
import { exec } from 'child_process'
import { isSea, getAsset } from 'node:sea'
import { join } from 'path'
import configManager from './configManager'
import Stream from 'stream'
import Webserver from './http'
import { platform } from 'os'

export async function OpenDefaultToPage (): Promise<string> {
  const url = `http://localhost:${Webserver.port}/config`
  
  const commands = {
    win32: `start "" "${url}"`,
    linux: `xdg-open "${url}"`
  }

  return new Promise((resolve, reject) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    exec(commands[platform()], (err, stdout) => {
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

export async function makeFile (path: string, contents: string | NodeJS.ArrayBufferView | Iterable<string | NodeJS.ArrayBufferView> | AsyncIterable<string | NodeJS.ArrayBufferView> | Stream) {
  await writeFile(path, contents)
  console.log(`Made file: ${path}`, contents)
}

export async function setupApplication () {
  if (!(await checkExists(baseDirectory))) { await makeDirectory(baseDirectory) }
  
  const configFile = join(baseDirectory, 'config.json')
  if (!(await checkExists(configFile))) { await configManager.save() }

  const publicFolder = join(baseDirectory, 'public')
  if (!(await checkExists(publicFolder))) { await makeDirectory(publicFolder) }
}

export async function extractSEAAssets () {
  if (!isSea()) { return }

  const HTMLfiles = ['README.txt', 'default_albumArt.html', 'default_songInfo.html']
  const publicFolder = join(baseDirectory, 'public')

  for (const file of HTMLfiles) {
    const targetFile = join(publicFolder, file)
    if (await checkExists(targetFile)) { continue }

    const asset = getAsset(file, 'utf8')
    await makeFile(targetFile, asset)
  }
}