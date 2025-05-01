/* eslint-disable @typescript-eslint/require-await */
import { getMostRecentFile } from 'src/modules/paths'
import { homedir } from 'os'
import { join } from 'path'
import Provider from "src/types/provider"
import sqlite from 'node:sqlite'
import type { Song } from "src/types/common"

class Mixxx extends Provider {
  db: sqlite.DatabaseSync

  constructor () {
    super()
  }

  async getLatestLinuxPath () {
    const dir = join(homedir(), '.mixxx', 'mixxxdb.sqlite')
    const fpDir = join(homedir(), '.var', 'app', 'org.mixxx.Mixxx', '.mixxx', 'mixxxdb.sqlite')

    return getMostRecentFile(dir, fpDir)
  }

  async getDbPath () {
    const paths: Record<string, () => Promise<string | null>> = {
      win32: async () => join(process.env.LOCALAPPDATA!, 'Mixxx', 'mixxxdb.sqlite'),
      linux: () => this.getLatestLinuxPath(),
      darwin: async () => join(homedir(), 'Library', 'Containers', 'org.mixxx.mixxx', 'Data', 'Library', 'Application Support', 'Mixxx', 'mixxxdb.sqlite')
    }
  
    return paths[process.platform]()
  }

  async create() {
    const p = await this.getDbPath()
    if (!p) { return }

    this.db = new sqlite.DatabaseSync(p, { readOnly: true })
  }

  async getLatestSong() {
    const q = this.db.prepare(`
      SELECT 
          pt.track_id,
          l.*,
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
      coverArt: null,
      additionalData: r
    }

    return ret as Song
  }

  async dispose() {
    this.db.close()
  }
}

export default Mixxx