import { join } from 'path'
import { readdir } from 'fs/promises'
import { SELECTED_RUNNER } from './../types/common'
import http from './../modules/http'

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
              background: #f5f5f5;
              color: #333;
          }
          .container {
              max-width: 600px;
              margin: 40px auto;
              padding: 20px;
              background: white;
              border-radius: 8px;
              box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          }
          h1 {
              color: #2c3e50;
              margin-bottom: 30px;
              text-align: center;
          }
          .software-select {
              width: 100%;
              padding: 12px;
              margin-bottom: 20px;
              border: 2px solid #ddd;
              border-radius: 6px;
              font-size: 16px;
              transition: border-color 0.3s;
          }
          .software-select:focus {
              outline: none;
              border-color: #3498db;
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
              background: #f8f9fa;
              border-radius: 6px;
              border: 1px solid #dee2e6;
          }
          .file-link {
              display: inline-block;
              color: #3498db;
              text-decoration: none;
              margin: 4px 0;
          }
          .file-link:hover {
              text-decoration: underline;
              color: #2980b9;
          }
      </style>
  </head>
  <body>
      <div class="container">
          <h1>DJ Display Configuration</h1>
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