import { OpenDefaultToPage } from "./modules/common"
import { SELECTED_RUNNER } from "./types/common"
import http from "./modules/http"
import Runner from "./modules/runner"
import ws from "./modules/ws"

async function begin () {

  const app = new Runner()
  await app.changeRunner(SELECTED_RUNNER.DJUCED)

  await http.connect()
  ws.connect()

  await OpenDefaultToPage()
}

begin().catch(console.error)