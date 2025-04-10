import Runner from "./modules/runner"
import { SELECTED_RUNNER } from "./types/common"

async function begin () {

  const app = new Runner()
  await app.changeRunner(SELECTED_RUNNER.DJUCED)
}

begin().catch(console.error)