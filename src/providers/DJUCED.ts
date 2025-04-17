/* eslint-disable @typescript-eslint/require-await */
import { homedir } from "os"
import { join } from 'path'
import Provider from "src/types/provider"
import sqlite from 'node:sqlite'
import type { Song } from "src/types/common"

class DJUCED extends Provider {
  db: sqlite.DatabaseSync

  constructor () {
    super()
  }

  async create() {
    this.db = new sqlite.DatabaseSync(join(homedir(), 'Documents', 'DJUCED', 'DJUCED.db'), { readOnly: true })
  }

  async getLatestSong() {
    const q = this.db.prepare('SELECT * FROM tracks WHERE last_played IS NOT NULL ORDER BY last_played DESC LIMIT 1')
    
    const data = q.all()[0]
    if (!data) { return null }
    
    delete data.waveform

    return  { 
      artist: data.artist,
      title: data.title,
      absolutepath: data.absolutepath,
      coverArt: null,
      additionalData: data
    } as Song
  }

  async dispose() {
    this.db.close()
  }
}

export default DJUCED