import { SELECTED_RUNNER, type Song } from "src/types/common"
import ws from "./ws"
import osc from "./osc"
import app from './runner'

class Events {
  songData: Song

  constructor () {
    this.songData = {
      title: '',
      artist: '',
      coverArt: '',
      absolutepath: '',
      additionalData: {}
    }
  }
  
  updateSong (song: Song) {
    this.songData = song

    console.log('Updated song data', song)
    ws.broadcast(song)
    
    osc.sendMessage('songupdate/absolutepath', song.absolutepath)
    if (song.title) { osc.sendMessage('songupdate/title', song.title) }
    if (song.artist) { osc.sendMessage('songupdate/artist', song.artist) }
    
    if (song.additionalData) {
      const keys = Object.keys(song.additionalData)

      for (const key of keys) {
        if (!song.additionalData[key]) { continue }

        osc.sendMessage(`additionalData/${SELECTED_RUNNER[app.selectedRunner]}/${key}`, song.additionalData[key])
      }
    }
  }
}

export default new Events()