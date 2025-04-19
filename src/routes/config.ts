import { OSC_TYPE, CONFIG } from './../types/common'
import { RequestHandler } from 'express'
import { Router } from 'express'
import app from './../modules/runner'
import config from './../pages/config'
import configManager from 'src/modules/configManager'

const router = Router()

router.get('/', async (req, res) => {
  res.send(await config())
})

const handleConfig: RequestHandler = async (req, res) => {
  const body = req.body as CONFIG

  // Validate software selection
  if (typeof body.selectedRunner !== 'number') {
    res.status(400).json({ success: false, error: 'Invalid software selection' })
    return
  }

  // Validate OSC port
  if (body.osc.enabled && (isNaN(body.osc.targetPort) || body.osc.targetPort < 1 || body.osc.targetPort > 65535)) {
    res.status(400).json({ success: false, error: 'Invalid OSC port number' })
    return
  }

  // Validate OSC remapped configuration
  if (body.osc.remapped) {
    for (const [sourcePath, targets] of Object.entries(body.osc.remapped)) {
      // Validate source path
      if (typeof sourcePath !== 'string' || sourcePath.trim().length === 0) {
        res.status(400).json({ success: false, error: 'Invalid source path in OSC mapping' })
        return
      }

      // Validate targets
      if (!Array.isArray(targets)) {
        res.status(400).json({ success: false, error: 'Invalid targets format in OSC mapping' })
        return
      }

      for (const target of targets) {
        if (!target.path || typeof target.path !== 'string' || target.path.trim().length === 0) {
          res.status(400).json({ success: false, error: 'Invalid target path in OSC mapping' })
          return
        }

        if (typeof target.type !== 'number' || !Object.values(OSC_TYPE).includes(target.type)) {
          res.status(400).json({ success: false, error: 'Invalid OSC type in mapping' })
          return
        }
      }
    }
  }

  // Update configuration
  const newConfig = { ...configManager.config }
  newConfig.selectedRunner = body.selectedRunner
  newConfig.osc.enabled = body.osc.enabled
  newConfig.osc.targetPort = body.osc.targetPort
  newConfig.osc.remapped = body.osc.remapped || {}
  configManager.config = newConfig

  // Change runner if needed
  await app.changeRunner(configManager.config.selectedRunner)
  
  res.json({ success: true })
}

router.post('/', handleConfig)

export default router 