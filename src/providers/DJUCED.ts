import { Database, open } from 'sqlite'
import { homedir } from "os"
import { join } from 'path'
import Provider from "src/types/provider"
import sqlite3 from 'sqlite3'
import type { Song } from "src/types/common"

class DJUCED extends Provider {
  db: Database
  constructor () {
    super()
  }

  async create() {
    this.db = await open({
      filename: join(homedir(), 'Documents', 'DJUCED', 'DJUCED.db'),
      driver: sqlite3.Database
    })
  }

  async getLatestSong() {
    const res = await this.db.get<Song>('SELECT artist, title, absolutepath FROM tracks WHERE last_played IS NOT NULL ORDER BY last_played DESC LIMIT 1')
    return res ?? null
  }

  async dispose() {
    await this.db.close()
  }
}

export default DJUCED