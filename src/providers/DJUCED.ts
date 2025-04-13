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
    const q = this.db.prepare('SELECT artist, title, absolutepath FROM tracks WHERE last_played IS NOT NULL ORDER BY last_played DESC LIMIT 1')
    const r = q.all()[0] as unknown as Song
    return r ?? null
  }

  async dispose() {
    this.db.close()
  }
}

export default DJUCED