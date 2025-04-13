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

  // eslint-disable-next-line @typescript-eslint/require-await
  async create() {
    this.db = new sqlite.DatabaseSync(join(homedir(), 'Documents', 'DJUCED', 'DJUCED.db'), { readOnly: true })
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  async getLatestSong() {
    const q = this.db.prepare('SELECT artist, title, absolutepath FROM tracks WHERE last_played IS NOT NULL ORDER BY last_played DESC LIMIT 1')
    const r = q.all()[0] as unknown as Song
    return r ?? null
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  async dispose() {
    this.db.close()
  }
}

export default DJUCED