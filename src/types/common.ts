export interface Song { artist: string | null, title: string | null, absolutepath: string, coverArt: string | null }

export enum SELECTED_RUNNER {
  NONE,
  DJUCED
}