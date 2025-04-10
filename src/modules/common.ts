import { exec } from 'child_process'
import Webserver from './http'

export async function OpenDefaultToPage (): Promise<string> {
  return new Promise((resolve, reject) => {
    exec(`start http://localhost:${Webserver.port}`, (err, stdout) => {
      if (err) { return reject(err) }
      return resolve(stdout)
    })
  })
}