/* eslint-disable @typescript-eslint/require-await */
import Provider from "src/types/provider"
import type { Song } from "src/types/common"

// TODO: Make this better... this cant be the best way...
class Traktor extends Provider {
  deckData: Record<string, Song> = {}
  currentSong: Song

  constructor () {
    super()

    this.currentSong = {
      artist: "",
      title: "",
      absolutepath: "",
      coverArt: null 
    }
  }

  async create() {
    // do nothing
  }

  async getLatestSong() {
    if (this.currentSong.absolutepath === '') { return null }

    return this.currentSong
  }

  async dispose() {
    // do nothing ig
  }

  setDeckData (deck: string, data: Song) {
    this.deckData[deck] = {
      absolutepath: data.absolutepath,
      title: data.title,
      artist: data.artist,
      coverArt: null
    }
  }

  setPlaying (deck: string) {
    if (this.deckData[deck]) {
      this.currentSong = this.deckData[deck]
    }
  }
}

export default Traktor