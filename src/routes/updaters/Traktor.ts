import { Router } from 'express'
import { SELECTED_RUNNER, additionalData } from 'src/types/common'
import app from './../../modules/runner'
import Traktor from 'src/providers/Traktor'

const router = Router()

router.post('/updateChannel/:channel', (req, res, next) => {
  if (app.selectedRunner !== SELECTED_RUNNER.Traktor) { return next() }

  // console.log('/updateChannel/:channel', req.params.channel, req.body)
  res.send(':ok')
})

interface DeckLoaded {
  filePath: string,
  title: string,
  artist: string,
  album: string,
  genre: string,
  comment: string,
  comment2: string,
  label: string,
  mix: string,
  remixer: string,
  key: string,
  keyText: string,
  gridOffset: number,
  trackLength: number,
  elapsedTime: number,
  nextCuePos: null,
  bpm: number,
  tempo: number,
  resultingKey: string,
  isPlaying: boolean,
  isSynced: boolean,
  isKeyLockOn: boolean
}

router.post('/deckLoaded/:deck', (req, res, next) => {
  if (app.selectedRunner !== SELECTED_RUNNER.Traktor) { return next() }

  const body = req.body as DeckLoaded
  const provider = app.provider as Traktor

  provider.setDeckData(req.params.deck, {
    absolutepath: body.filePath,
    title: body.title,
    artist: body.artist,
    coverArt: null,
    additionalData: req.body as additionalData
  })

  // console.log('/deckLoaded/:deck', req.params.deck, req.body)
  res.send(':ok')
})

interface UpdateDeck { elapsedTime?: number, nextCuePos?: number, resultingKey?: string, isPlaying?: boolean }

router.post('/updateDeck/:deck', (req, res, next) => {
  if (app.selectedRunner !== SELECTED_RUNNER.Traktor) { return next() }

  const body = req.body as UpdateDeck
  const provider = app.provider as Traktor

  if (body.isPlaying) {
    provider.setPlaying(req.params.deck)
  }
  
  // console.log('/updateDeck/:deck', req.params.deck, req.body)
  res.send(':ok')
})

router.post('/updateMasterClock', (req, res, next) => {
  if (app.selectedRunner !== SELECTED_RUNNER.Traktor) { return next() }

  // console.log(req.body)
  res.send(':ok')
})

export default router 