import type { Song } from "src/types/common"
import ws from "./ws"

class Events {
  songData: Song

  constructor () {
    this.songData = {
      title: '',
      artist: '',
      coverArt: '',
      absolutepath: ''
    }
  }
  
  updateSong (song: Song) {
    this.songData = song

    console.log('Updated song data', song)
    ws.broadcast(song)
  }
}

export default new Events()