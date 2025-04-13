import { extractSEAAssets, OpenDefaultToPage, setupApplication } from "./modules/common"
import app from "./modules/runner"
import configManager from "./modules/configManager"
import http from "./modules/http"
import ws from "./modules/ws"

async function begin () {
  await setupApplication()
  await configManager.load()

  await extractSEAAssets()
  await app.changeRunner(configManager.config.selectedRunner)

  await http.connect()
  ws.connect()

  OpenDefaultToPage().catch(console.error)
}

begin().catch(console.error)