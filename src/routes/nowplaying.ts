import { Router } from "express"
import events from "./../modules/events"

const router = Router()

router.get('/', (req, res) => {
  res.json(events.songData)
})

export default router