import { Router } from 'express'
import { SELECTED_RUNNER } from './../types/common'
import app from './../modules/runner'
import config from './../pages/config'
import configManager from 'src/modules/configManager'

const router = Router()

router.get('/', async (req, res) => {
  res.send(await config())
})

interface SOFTWARE_BODY { software: string }
router.post('/software', async (req, res) => {
  const body = req.body as SOFTWARE_BODY

  if (typeof SELECTED_RUNNER[body.software] !== 'number') { throw new Error('Unexpected Runner')}
  configManager.config.selectedRunner = SELECTED_RUNNER[body.software] as SELECTED_RUNNER
  
  await app.changeRunner(configManager.config.selectedRunner)
  
  res.json({ success: true, selected: body.software })
})

export default router 