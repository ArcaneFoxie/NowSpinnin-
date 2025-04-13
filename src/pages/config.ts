import { join } from 'path'
import { readdir } from 'fs/promises'
import { SELECTED_RUNNER } from './../types/common'
import http from './../modules/http'
import pkg from '../../package.json'

const GITHUB_REPO = 'ArcaneFoxie/NowSpinnin-'  // Update this with your actual GitHub repository

interface GitHubRelease {
  tag_name: string;
}

async function checkLatestVersion() {
  try {
    const response = await fetch(`https://api.github.com/repos/${GITHUB_REPO}/releases/latest`)
    if (!response.ok) return null
    const data = await response.json() as GitHubRelease
    return data.tag_name.replace('v', '')
  } catch (error) {
    console.error('Error checking latest version:', error)
    return null
  }
}

function getSupportedRunners () {
  const values = Object.values(SELECTED_RUNNER)
  return values.filter(k => isNaN(Number(k))).map((v) => `<option value="${v}">${v}</option>`).join('\n')
}

async function getPublicFiles(dir: string) {
    let results: string[] = []
    const list = await readdir(http.publicPath, { withFileTypes: true })

    for (const dirent of list) {
      const fullPath = join(dir, dirent.name)
      if (dirent.isDirectory()) {
        results = results.concat(await getPublicFiles(fullPath))
      } else {
        results.push(fullPath)
      }
    }

    return results
}

async function renderLinks () {
    const publicFiles = await getPublicFiles(http.publicPath)
    const fileLinks = publicFiles
      .map(file => `<a href="/public${file.replace(http.publicPath, '')}" class="file-link">${file.replace(http.publicPath, '')}</a>`)
      .join('<br>')

    return fileLinks
}

export default async function () {
  const currentVersion = pkg.version
  const latestVersion = await checkLatestVersion()
  const isOutdated = latestVersion && currentVersion < latestVersion

  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>DJ Display Configuration</title>
      <style>
          body {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
              line-height: 1.6;
              margin: 0;
              padding: 20px;
              background: #1a1a1a;
              color: #e0e0e0;
          }
          .container {
              max-width: 600px;
              margin: 40px auto;
              padding: 20px;
              background: #2d2d2d;
              border-radius: 8px;
              box-shadow: 0 2px 4px rgba(0,0,0,0.2);
          }
          h1 {
              color: #fff;
              margin-bottom: 30px;
              text-align: center;
          }
          h2 {
              color: #fff;
          }
          .software-select {
              width: 100%;
              padding: 12px;
              margin-bottom: 20px;
              border: 2px solid #404040;
              border-radius: 6px;
              font-size: 16px;
              transition: border-color 0.3s;
              background: #363636;
              color: #e0e0e0;
          }
          .software-select:focus {
              outline: none;
              border-color: #3498db;
          }
          .software-select option {
              background: #363636;
              color: #e0e0e0;
          }
          .save-btn {
              display: block;
              width: 100%;
              padding: 12px;
              background: #3498db;
              color: white;
              border: none;
              border-radius: 6px;
              font-size: 16px;
              cursor: pointer;
              transition: background 0.3s;
          }
          .save-btn:hover {
              background: #2980b9;
          }
          .status {
              margin-top: 20px;
              text-align: center;
              color: #27ae60;
          }
          .file-list {
              margin-top: 30px;
              padding: 15px;
              background: #363636;
              border-radius: 6px;
              border: 1px solid #404040;
          }
          .file-link {
              display: inline-block;
              color: #3498db;
              text-decoration: none;
              margin: 4px 0;
          }
          .file-link:hover {
              text-decoration: underline;
              color: #5dade2;
          }
          .version-info {
              margin: 20px 0;
              padding: 10px;
              border-radius: 6px;
              text-align: center;
              background: #363636;
              border: 1px solid #404040;
          }
          .version-current {
              font-weight: bold;
              color: #e0e0e0;
          }
          .version-outdated {
              background: #453a16;
              color: #ffd866;
              border: 1px solid #665c2e;
          }
          .version-error {
              background: #442326;
              color: #ff8b8b;
              border: 1px solid #662d32;
          }
          .github-link {
              color: #3498db;
              text-decoration: none;
              margin-left: 10px;
          }
          .github-link:hover {
              text-decoration: underline;
              color: #5dade2;
          }
      </style>
  </head>
  <body>
      <div class="container">
          <h1>DJ Display Configuration</h1>
          
          <div class="version-info ${isOutdated ? 'version-outdated' : ''} ${!latestVersion ? 'version-error' : ''}">
              <span class="version-current">Current Version: v${currentVersion}</span>
              <a href="https://github.com/${GITHUB_REPO}" target="_blank" class="github-link">View on GitHub</a>
              ${isOutdated ? `<br>New version available: ${latestVersion}` : ''}
              ${!latestVersion ? '<br>Unable to check for updates' : ''}
          </div>

          <form id="configForm">
              <select class="software-select" id="software" name="software">
                ${getSupportedRunners()}
              </select>
              <button type="submit" class="save-btn">Save Configuration</button>
          </form>
          <div id="status" class="status"></div>
          
          <div class="file-list">
              <h2>Public Files:</h2>
              ${await renderLinks()}
          </div>
      </div>

      <script>
          document.getElementById('configForm').addEventListener('submit', async (e) => {
              e.preventDefault()
              const software = document.getElementById('software').value
              
              if (!software) {
                  document.getElementById('status').textContent = 'Please select a DJ software'
                  document.getElementById('status').style.color = '#e74c3c'
                  return
              }

              try {
                  const response = await fetch('/config/software', {
                      method: 'POST',
                      headers: {
                          'Content-Type': 'application/json',
                      },
                      body: JSON.stringify({ software }),
                  })
                  
                  const data = await response.json()
                  if (data.success) {
                      document.getElementById('status').textContent = \`Configuration saved: \${software}\`
                      document.getElementById('status').style.color = '#27ae60'
                  }
              } catch (error) {
                  document.getElementById('status').textContent = 'Error saving configuration'
                  document.getElementById('status').style.color = '#e74c3c'
              }
          })
      </script>
  </body>
  </html> 
  `
}