import { Router } from 'express'
import { RequestHandler } from 'express'
import { SELECTED_RUNNER } from './../types/common'
import app from './../modules/runner'
import config from './../pages/config'
import configManager from 'src/modules/configManager'

const router = Router()

router.get('/', async (req, res) => {
  res.send(await config())
})

interface ConfigBody {
  software: string;
  osc: {
    enabled: boolean;
    targetPort: number;
  };
}

const handleConfig: RequestHandler = async (req, res) => {
  const body = req.body as ConfigBody

  // Validate software selection
  if (typeof SELECTED_RUNNER[body.software] !== 'number') {
    res.status(400).json({ success: false, error: 'Invalid software selection' })
    return
  }

  // Validate OSC port
  if (body.osc.enabled && (isNaN(body.osc.targetPort) || body.osc.targetPort < 1 || body.osc.targetPort > 65535)) {
    res.status(400).json({ success: false, error: 'Invalid OSC port number' })
    return
  }

  // Update configuration
  const newConfig = { ...configManager.config }
  newConfig.selectedRunner = SELECTED_RUNNER[body.software] as SELECTED_RUNNER
  newConfig.osc.enabled = body.osc.enabled
  newConfig.osc.targetPort = body.osc.targetPort
  configManager.config = newConfig

  // Change runner if needed
  await app.changeRunner(configManager.config.selectedRunner)
  
  res.json({ success: true })
}

router.post('/', handleConfig)

export default router 