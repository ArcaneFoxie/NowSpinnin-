import { GetCoverFromFile } from "./metadata"
import { SELECTED_RUNNER } from "src/types/common"
import events from "./events"
import Provider from "src/types/provider"

class Runner {
  selectedRunner: SELECTED_RUNNER
  provider: Provider
  timer: NodeJS.Timeout

  constructor () {
    this.selectedRunner = SELECTED_RUNNER.NONE
    this.provider = new Provider()

    this.timer = setInterval(() => {
      if (this.selectedRunner === SELECTED_RUNNER.NONE) { return }
      this.checkSongChange().catch(console.error)
    }, 1000)
  }

  async importProvider (target: SELECTED_RUNNER): Promise<typeof Provider> {

    switch (target) {
      case SELECTED_RUNNER.DJUCED: 
        return (await import('./../providers/DJUCED')).default
      case SELECTED_RUNNER.Mixxx: 
        return (await import('./../providers/Mixxx')).default
      case SELECTED_RUNNER.VirtualDJ: 
        return (await import('./../providers/VirtualDJ')).default
      
      default: 
        return (await import('./../types/provider')).default
    }
  }

  async changeRunner (selected: SELECTED_RUNNER) {
    console.log(`Setting up runner: ${SELECTED_RUNNER[selected]}`)

    if (this.selectedRunner !== SELECTED_RUNNER.NONE) { await this.provider.dispose() }

    this.selectedRunner = selected
    this.provider = new (await this.importProvider(this.selectedRunner))

    if (this.selectedRunner === SELECTED_RUNNER.NONE) { return }
    await this.provider.create()
  }

  async checkSongChange () {
    const newSong = await this.provider.getLatestSong()
    if (newSong === null) { return }

    if (newSong.absolutepath === events.songData.absolutepath) { return }
    newSong.coverArt = await GetCoverFromFile(newSong.absolutepath)
    events.updateSong(newSong)
  }
}

export default new Runner()
