import { flattenJson } from "./common"
import { SELECTED_RUNNER, type Song } from "src/types/common"
import app from './runner'
import osc from "./osc"
import ws from "./ws"

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
      const data = flattenJson(song.additionalData)
      const keys = Object.keys(data)

      for (const key of keys) {
        if (!data[key]) { continue }
        
        osc.sendMessage(`additionalData/${SELECTED_RUNNER[app.selectedRunner]}/${key}`, data[key])
      }
    }
  }
}

export default new Events()