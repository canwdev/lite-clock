import screenfull from "screenfull"

const rootEl = document.getElementById('root')
const toggleEl = document.getElementById('settings_toggle')
const listEl = document.getElementById('settings_list')

function toggleSettingsDisplay() {
  let flag = true
  return function () {
    flag = !flag
    listEl.style.display = flag ? 'none' : null
  }
}
const toggle = toggleSettingsDisplay()
toggleEl.onclick = toggle
listEl.style.display = 'none'

function addSettings() {

  const settingsList = [
    {name: '▢', action: () => {screenfull.toggle()}},
    {name: '☯', action: toggleTheme}
  ]

  settingsList.forEach(item => {
    const btn = document.createElement('button')
    btn.onclick = () => {
      item.action()
      toggle()
    }
    btn.innerText = item.name
    listEl.appendChild(btn)
  })
}
addSettings()

function toggleTheme() {
  rootEl.classList.toggle('light-theme')
}
