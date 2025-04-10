import { Router } from "express"
import events from "./../modules/events"

const router = Router()

router.get('/nowplaying', (req, res) => {
  res.json(events.songData)
})

export default router