import screenfull from "screenfull"
import {getQueryObj, updateQuery} from "./utils"

const rootEl = document.getElementById('root')
const toggleEl = document.getElementById('settings_toggle')
const listEl = document.getElementById('settings_list')
const queryObj = getQueryObj()

/**
 * 切换是否显示设置图标
 * @returns {function(...[*]=)}
 * @private
 */
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
 * 切换Bing壁纸
 */
let flagThemeBing = false

function toggleBing(disable) {
  if (disable) flagThemeBing = false

  if (!flagThemeBing) {
    setBingWallpaper()
    rootEl.classList.add('bing')
    rootEl.classList.remove('light-theme')
  } else {
    setBingWallpaper(true)
    rootEl.classList.remove('bing')
  }
  updateQuery({
    theme: flagThemeBing ? null : 'bing'
  })
  flagThemeBing = !flagThemeBing
}


/**
 * 切换主题
 */
let flagThemeDark = false

function toggleTheme() {
  toggleBing(true)
  if (!flagThemeDark) {
    rootEl.classList.add('light-theme')
  } else {
    rootEl.classList.remove('light-theme')
  }
  updateQuery({
    theme: flagThemeDark ? null : 'light'
  })
  flagThemeDark = !flagThemeDark
}

if (queryObj.theme === 'bing') {
  toggleBing()
} else if (queryObj.theme === 'light') {
  toggleTheme()
}

/**
 * 添加设置图标
 */
function addSettings() {
  const settingsList = [
    {name: 'B', action: toggleBing},
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

function setBingWallpaper(clear = false) {
  if (clear) {
    document.body.style.backgroundImage = null
    return
  }

  // 有跨域
  /*import('axios').then(({default: axios}) => {
    axios.get('https://www.bing.com/HPImageArchive.aspx?format=js&idx=0&n=1').then(res => {
      console.log(res)
    }).catch(e => {
      console.error(e)
    })
  })*/

  document.body.style.backgroundImage = `url('https://api.dujin.org/bing/1920.php')`
}
