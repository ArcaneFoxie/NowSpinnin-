/* eslint-disable @typescript-eslint/require-await */
import { homedir, platform } from 'os'
import { join } from 'path'
import Provider from "src/types/provider"
import sqlite from 'node:sqlite'
import type { Song } from "src/types/common"

class Mixxx extends Provider {
  db: sqlite.DatabaseSync

  constructor () {
    super()
  }

  getDbPath () {
    const paths: Record<string, () => string> = {
      win32: () => join(process.env.LOCALAPPDATA!, 'Mixxx', 'mixxxdb.sqlite'),
      linux: () => join(homedir(), '.var', 'app', 'org.mixxx.Mixxx', '.mixxx', 'mixxxdb.sqlite'),
    }
  
    return paths[process.platform]()
  }

  async create() {
    this.db = new sqlite.DatabaseSync(this.getDbPath(), { readOnly: true })
  }

  async getLatestSong() {
    const q = this.db.prepare(`
      SELECT 
          pt.track_id,
          l.artist,
          l.title,
          tl.location
      FROM 
          playlistTracks pt
      JOIN 
          library l ON pt.track_id = l.id
      JOIN 
          track_locations tl ON l.id = tl.id
      ORDER BY 
          pt.pl_datetime_added DESC
      LIMIT 1;
    `)

    const r = q.all()[0]
    if (!r) { return null }

    const ret = { 
      artist: r.artist,
      title: r.title,
      absolutepath: r.location,
      coverArt: null 
    }

    return ret as Song
  }

  async dispose() {
    this.db.close()
  }
}

export default Mixxx