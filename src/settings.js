import screenfull from "screenfull"
import {getQueryObj, updateQuery} from "./utils"

const rootEl = document.getElementById('root')
const toggleEl = document.getElementById('settings_toggle')
const listEl = document.getElementById('settings_list')
const queryObj = getQueryObj()

function _toggleSettingsDisplay() {
  let flag = true
  return function () {
    flag = !flag
    listEl.style.display = flag ? 'none' : null
  }
}

const toggleSettingsDisplay = _toggleSettingsDisplay()
toggleEl.onclick = toggleSettingsDisplay
listEl.style.display = 'none'

/**
 * 切换主题
 * @returns {function(...[*]=)}
 * @private
 */
function _toggleTheme() {
  let dark = true
  return function () {
    if (dark) {
      rootEl.classList.add('light-theme')
    } else {
      rootEl.classList.remove('light-theme')
    }
    updateQuery({
      theme: dark ? 'light' : null
    })
    dark = !dark
  }
}

const toggleTheme = _toggleTheme()
if (queryObj.theme === 'light') {
  toggleTheme()
}

function addSettings() {

  const settingsList = [
    {name: '☯', action: toggleTheme},
    {
      name: '▢', action: () => {
        screenfull.toggle()
      }
    },
  ]

  settingsList.forEach(item => {
    const btn = document.createElement('button')
    btn.onclick = () => {
      item.action()
      toggleSettingsDisplay()
    }
    btn.innerText = item.name
    listEl.appendChild(btn)
  })
}

addSettings()
