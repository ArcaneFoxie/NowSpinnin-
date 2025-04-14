/* eslint-disable @typescript-eslint/require-await */
import { homedir } from 'os'
import { readdir, readFile, stat } from 'fs/promises'
import path, { join } from 'path'
import Provider from "src/types/provider"
import type { Song } from "src/types/common"

// TODO: Make this better... this cant be the best way...
class VirtualDJ extends Provider {
  cachedSong: Song
  filePath: string
  lastModified: number
  tracklistPath: string

  constructor () {
    super()

    this.lastModified = 0
    this.cachedSong = {
      artist: "",
      title: "",
      absolutepath: "",
      coverArt: null,
      additionalData: {}
    }
  }

  async create() {
    this.filePath = join(homedir(), 'Documents', 'VirtualDJ', 'History')
    this.tracklistPath = join(this.filePath, 'tracklist.txt')
  }

  async getLatestSong() {
    const fileStat = await stat(this.tracklistPath)

    if (fileStat.mtimeMs === this.lastModified) { return this.cachedSong }
    this.lastModified = fileStat.mtimeMs

    const m3uFile = await this.getLatestM3UFile(this.filePath)
    if (!m3uFile) { return null }

    const data = (await readFile(m3uFile)).toString()
    const lines = data.trim().split('\n')
    const lastTwoLines = lines.slice(-2)

    const artist = this.extractTag('artist', lastTwoLines[0])
    const title = this.extractTag('title', lastTwoLines[0])

    const ret = { 
      artist: artist,
      title: title,
      absolutepath: lastTwoLines[1],
      coverArt: null,
      additionalData: {}
    }

    this.cachedSong = ret

    return ret as Song
  }

  async dispose() {
    // do nothing ig
  }

  private async getLatestM3UFile(dir: string): Promise<string | null> {
    const files = await readdir(dir)

    const m3uFiles: { file: string; time: number }[] = []

    for (const file of files) {
        if (file.endsWith('.m3u')) {
            const fullPath = path.join(dir, file)
            const fileStat = await stat(fullPath)
            m3uFiles.push({ file: fullPath, time: fileStat.mtime.getTime() })
        }
    }

    m3uFiles.sort((a, b) => b.time - a.time)

    return m3uFiles.length > 0 ? m3uFiles[0].file : null
  }
  
  private extractTag(tag: string, str: string): string {
    const regex = new RegExp(`<${tag}>(.*?)</${tag}>`)
    const match = regex.exec(str)!
    return match[1]
  }
}

export default VirtualDJ