import { join } from 'path'
import { readdir } from 'fs/promises'
import { SELECTED_RUNNER, OSC_TYPE } from './../types/common'
import configManager from './../modules/configManager'
import http from './../modules/http'
import pkg from '../../package.json'

const GITHUB_REPO = 'ArcaneFoxie/NowSpinnin-'

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
  return values
    .filter(k => isNaN(Number(k)))
    .map((v) => `<option value="${v}" ${v === SELECTED_RUNNER[configManager.config.selectedRunner] ? 'selected' : ''}>${v}</option>`)
    .join('\n')
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
  const currentConfig = configManager.config

  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>NowSpinnin- Configuration</title>
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
          .software-select, .form-control {
              width: 100%;
              padding: 12px;
              margin-bottom: 20px;
              border: 2px solid #404040;
              border-radius: 6px;
              font-size: 16px;
              transition: border-color 0.3s;
              background: #363636;
              color: #e0e0e0;
              box-sizing: border-box;
          }
          .software-select:focus, .form-control:focus {
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
          .form-group {
              margin-bottom: 20px;
          }
          
          .form-group label {
              display: block;
              margin-bottom: 8px;
              color: #e0e0e0;
          }
          
          input[type="number"] {
              -moz-appearance: textfield;
          }
          
          input[type="number"]::-webkit-inner-spin-button,
          input[type="number"]::-webkit-outer-spin-button {
              -webkit-appearance: none;
              margin: 0;
          }
          
          .toggle-container {
              display: flex;
              align-items: center;
              gap: 10px;
          }
          
          .toggle-switch {
              position: relative;
              display: inline-block;
              width: 60px;
              height: 34px;
          }
          
          .toggle-switch input {
              opacity: 0;
              width: 0;
              height: 0;
          }
          
          .toggle-slider {
              position: absolute;
              cursor: pointer;
              top: 0;
              left: 0;
              right: 0;
              bottom: 0;
              background-color: #404040;
              transition: .4s;
              border-radius: 34px;
          }
          
          .toggle-slider:before {
              position: absolute;
              content: "";
              height: 26px;
              width: 26px;
              left: 4px;
              bottom: 4px;
              background-color: #e0e0e0;
              transition: .4s;
              border-radius: 50%;
          }
          
          input:checked + .toggle-slider {
              background-color: #3498db;
          }
          
          input:checked + .toggle-slider:before {
              transform: translateX(26px);
          }
          
          .section-title {
              margin-top: 30px;
              margin-bottom: 20px;
              padding-bottom: 10px;
              border-bottom: 1px solid #404040;
          }
          
          .osc-mappings {
              margin-top: 20px;
              padding: 15px;
              background: #363636;
              border-radius: 6px;
              border: 1px solid #404040;
          }
          
          .mapping-group {
              margin-bottom: 20px;
              padding: 15px;
              background: #2d2d2d;
              border-radius: 6px;
          }
          
          .mapping-source {
              margin-bottom: 10px;
          }
          
          .mapping-targets {
              margin-left: 20px;
          }
          
          .mapping-item {
              display: grid;
              grid-template-columns: 1fr auto auto;
              gap: 10px;
              margin-bottom: 10px;
              padding: 10px;
              background: #363636;
              border-radius: 4px;
              align-items: center;
          }
          
          .mapping-controls {
              display: flex;
              gap: 10px;
              margin-top: 15px;
          }
          
          .group-controls {
              display: flex;
              gap: 10px;
              margin-top: 10px;
          }
          
          .btn {
              padding: 8px 12px;
              border: none;
              border-radius: 4px;
              cursor: pointer;
              font-size: 14px;
              transition: background 0.3s;
          }
          
          .btn-add {
              background: #27ae60;
              color: white;
          }
          
          .btn-add:hover {
              background: #219a52;
          }
          
          .btn-remove {
              background: #e74c3c;
              color: white;
              padding: 4px 8px;
          }
          
          .btn-remove:hover {
              background: #c0392b;
          }
          
          .btn-add-target {
              background: #2980b9;
              color: white;
              font-size: 12px;
              padding: 4px 8px;
          }
          
          .btn-add-target:hover {
              background: #2471a3;
          }
          
          .type-select {
              padding: 4px 8px;
              border-radius: 4px;
              background: #404040;
              color: #e0e0e0;
              border: 1px solid #505050;
          }
      </style>
  </head>
  <body>
      <div class="container">
          <h1>NowSpinnin- Configuration</h1>
          
          <div class="version-info ${isOutdated ? 'version-outdated' : ''} ${!latestVersion ? 'version-error' : ''}">
              <span class="version-current">Current Version: v${currentVersion}</span>
              <a href="https://github.com/${GITHUB_REPO}" target="_blank" class="github-link">View on GitHub</a>
              ${isOutdated ? `<br>New version available: ${latestVersion}` : ''}
              ${!latestVersion ? '<br>Unable to check for updates' : ''}
          </div>

          <form id="configForm">
              <h2 class="section-title">DJ Software</h2>
              <div class="form-group">
                  <label for="software">Select DJ Software:</label>
                  <select class="software-select" id="software" name="software">
                    ${getSupportedRunners()}
                  </select>
              </div>

              <h2 class="section-title">OSC Settings</h2>
              <div class="form-group">
                  <div class="toggle-container">
                      <label for="oscEnabled">Enable OSC:</label>
                      <label class="toggle-switch">
                          <input type="checkbox" id="oscEnabled" name="oscEnabled" ${currentConfig.osc.enabled ? 'checked' : ''}>
                          <span class="toggle-slider"></span>
                      </label>
                  </div>
              </div>

              <div class="form-group">
                  <label for="oscPort">OSC Target Port:</label>
                  <input type="number" class="form-control" id="oscPort" name="oscPort" 
                         value="${currentConfig.osc.targetPort}" min="1" max="65535">
              </div>

              <div class="osc-mappings">
                  <h3>OSC Mappings</h3>
                  <div id="mappingsList">
                      ${Object.entries(currentConfig.osc.remapped).map(([source, targets]) => `
                          <div class="mapping-group" data-source="${source}">
                              <div class="mapping-source">
                                  <input type="text" class="form-control" placeholder="Source Path" value="${source}">
                              </div>
                              <div class="mapping-targets">
                                  ${targets.map(target => `
                                      <div class="mapping-item">
                                          <input type="text" class="form-control" placeholder="Target Path" value="${target.path}">
                                          <select class="type-select">
                                              ${Object.entries(OSC_TYPE)
                                                  .filter(([key]) => isNaN(Number(key)))
                                                  .map(([key, value]) => 
                                                      `<option value="${value}" ${value === target.type ? 'selected' : ''}>${key}</option>`
                                                  ).join('')}
                                          </select>
                                          <button type="button" class="btn btn-remove" onclick="removeTarget(this)">×</button>
                                      </div>
                                  `).join('')}
                              </div>
                              <div class="group-controls">
                                  <button type="button" class="btn btn-add-target" onclick="addTarget(this)">Add Target</button>
                                  <button type="button" class="btn btn-remove" onclick="removeMapping(this)">Remove Mapping</button>
                              </div>
                          </div>
                      `).join('')}
                  </div>
                  <div class="mapping-controls">
                      <button type="button" class="btn btn-add" onclick="addNewMapping()">Add New Mapping</button>
                  </div>
              </div>

              <button type="submit" class="save-btn">Save Configuration</button>
          </form>
          <div id="status" class="status"></div>
          
          <div class="file-list">
              <h2>Public Files:</h2>
              ${await renderLinks()}
          </div>
      </div>

      <script>
          // Expose the SELECTED_RUNNER enum to frontend
          const SELECTED_RUNNER = ${JSON.stringify(Object.fromEntries(
              Object.entries(SELECTED_RUNNER).filter(([key]) => isNaN(Number(key)))
          ))}

          function addNewMapping() {
              const mappingsList = document.getElementById('mappingsList')
              const newMapping = document.createElement('div')
              newMapping.className = 'mapping-group'
              newMapping.innerHTML = \`
                  <div class="mapping-source">
                      <input type="text" class="form-control" placeholder="Source Path">
                  </div>
                  <div class="mapping-targets">
                      <div class="mapping-item">
                          <input type="text" class="form-control" placeholder="Target Path">
                          <select class="type-select">
                              ${Object.entries(OSC_TYPE)
                                  .filter(([key]) => isNaN(Number(key)))
                                  .map(([key, value]) => 
                                      `<option value="${value}">${key}</option>`
                                  ).join('')}
                          </select>
                          <button type="button" class="btn btn-remove" onclick="removeTarget(this)">×</button>
                      </div>
                  </div>
                  <div class="group-controls">
                      <button type="button" class="btn btn-add-target" onclick="addTarget(this)">Add Target</button>
                      <button type="button" class="btn btn-remove" onclick="removeMapping(this)">Remove Mapping</button>
                  </div>
              \`
              mappingsList.appendChild(newMapping)
          }

          function addTarget(button) {
              const targetsList = button.closest('.mapping-group').querySelector('.mapping-targets')
              const newTarget = document.createElement('div')
              newTarget.className = 'mapping-item'
              newTarget.innerHTML = \`
                  <input type="text" class="form-control" placeholder="Target Path">
                  <select class="type-select">
                      ${Object.entries(OSC_TYPE)
                          .filter(([key]) => isNaN(Number(key)))
                          .map(([key, value]) => 
                              `<option value="${value}">${key}</option>`
                          ).join('')}
                  </select>
                  <button type="button" class="btn btn-remove" onclick="removeTarget(this)">×</button>
              \`
              targetsList.appendChild(newTarget)
          }

          function removeTarget(button) {
              const mappingItem = button.closest('.mapping-item')
              const mappingTargets = mappingItem.parentElement
              if (mappingTargets.children.length > 1) {
                  mappingItem.remove()
              } else {
                  // If this is the last target, remove the entire mapping group
                  mappingItem.closest('.mapping-group').remove()
              }
          }

          function removeMapping(button) {
              button.closest('.mapping-group').remove()
          }

          document.getElementById('configForm').addEventListener('submit', async (e) => {
              e.preventDefault()
              const software = document.getElementById('software').value
              const oscEnabled = document.getElementById('oscEnabled').checked
              const oscPort = parseInt(document.getElementById('oscPort').value, 10)
              
              if (!software) {
                  document.getElementById('status').textContent = 'Please select a DJ software'
                  document.getElementById('status').style.color = '#e74c3c'
                  return
              }

              if (oscEnabled && (isNaN(oscPort) || oscPort < 1 || oscPort > 65535)) {
                  document.getElementById('status').textContent = 'Please enter a valid port number (1-65535)'
                  document.getElementById('status').style.color = '#e74c3c'
                  return
              }

              // Collect OSC mappings
              const mappings = {}
              document.querySelectorAll('.mapping-group').forEach(group => {
                  const sourcePath = group.querySelector('.mapping-source input').value
                  if (sourcePath) {
                      mappings[sourcePath] = []
                      group.querySelectorAll('.mapping-item').forEach(item => {
                          const targetPath = item.querySelector('input').value
                          const type = parseInt(item.querySelector('.type-select').value)
                          if (targetPath) {
                              mappings[sourcePath].push({ path: targetPath, type })
                          }
                      })
                      // Remove empty mappings
                      if (mappings[sourcePath].length === 0) {
                          delete mappings[sourcePath]
                      }
                  }
              })

              try {
                  const response = await fetch('/config', {
                      method: 'POST',
                      headers: {
                          'Content-Type': 'application/json',
                      },
                      body: JSON.stringify({ 
                          selectedRunner: SELECTED_RUNNER[software],
                          osc: {
                              enabled: oscEnabled,
                              targetPort: oscPort,
                              remapped: mappings
                          }
                      }),
                  })
                  
                  const data = await response.json()
                  if (data.success) {
                      document.getElementById('status').textContent = 'Configuration saved successfully'
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