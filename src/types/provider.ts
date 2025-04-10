import type { Song } from "./common"

/* eslint-disable @typescript-eslint/require-await */
export default class Provider {
  async create (): Promise<void> {
    throw new Error('Method not implimented')
  }

  async getLatestSong (): Promise<Song | null> {
    throw new Error('Method not implimented')
  }

  async dispose (): Promise<void> {
    throw new Error('Method not implimented')
  }
}