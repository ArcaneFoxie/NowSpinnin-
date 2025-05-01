import { dirname, join } from 'path'
import { fileURLToPath } from 'url'
import { isSea } from 'node:sea'
import packageJson from './../../package.json'
import { stat } from 'fs/promises'

export function _dirname () {
  if (isSea()) {
    return __dirname
  } else {
    return join(dirname(fileURLToPath(import.meta.url)), '..', '..')
  }
}

export async function getModifiedTime (filePath: string): Promise<Date | null> {
  try {
    const stats = await stat(filePath)
    return stats.mtime
  } catch (error) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if (error.code === 'ENOENT') {
      return null
    }
    throw error
  }
}

export async function getMostRecentFile(file1: string, file2: string): Promise<string | null> {

  const [mtime1, mtime2] = await Promise.all([
    getModifiedTime(file1),
    getModifiedTime(file2)
  ])

  if (mtime1 && mtime2) {
    return mtime1 > mtime2 ? file1 : file2
  } else if (mtime1) {
    return file1
  } else if (mtime2) {
    return file2
  } else {
    return null
  }
}

export const baseDirectory = join(_dirname(), `${packageJson.prettyName} data`) 