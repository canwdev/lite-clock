import screenfull from "screenfull"
import {getQueryObj, isProd, updateQuery} from "./utils"

const rootEl = document.getElementById('root')
const toggleEl = document.getElementById('settings_toggle')
const listEl = document.getElementById('settings_list')
const timeEl = document.getElementById('acc_time')
const dateEl = document.getElementById('acc_date')
const footnoteTextEl = document.getElementById('footnote_text')
const queryObj = getQueryObj()

/**
 * 切换是否显示设置图标
 */
let flagShowSettings = false

function toggleSettingsDisplay() {
  listEl.style.display = flagShowSettings ? 'none' : null
  flagShowSettings = !flagShowSettings
}

toggleEl.addEventListener('click', toggleSettingsDisplay)
listEl.style.display = 'none'


/**
 * 切换Bing壁纸
 */
let flagThemeBing = true

function toggleBing(forceState = null) {
  const flag = forceState !== null ? forceState : flagThemeBing
  if (flag) {
    setBingWallpaper()
    rootEl.classList.add('bing')
    rootEl.classList.remove('light-theme')
  } else {
    setBingWallpaper(true)
    rootEl.classList.remove('bing')
  }
  updateQuery({
    theme: flag ? 'bing' : null
  })
  flagThemeBing = !flag
}


/**
 * 切换主题
 */
let flagThemeDark = false

function toggleTheme() {
  toggleBing(false)
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
  toggleBing(true)
} else if (queryObj.theme === 'light') {
  toggleTheme()
}

/**
 * 切换字体缩放
 */
let scaleRatio = queryObj.scale || 1

function toggleFontSize() {
  const ratioText = prompt('缩放率', scaleRatio)
  if (!ratioText) return

  const ratio = parseFloat(ratioText)
  if (Number.isNaN(ratio)) {
    alert('请输入一个数值')
    return
  }
  setFontSizeRatio(ratio)
}

function setFontSizeRatio(ratio) {
  updateQuery({
    scale: ratio !== 1 ? ratio : null
  })
  if (ratio === 1) {
    timeEl.style.fontSize = null
    dateEl.style.fontSize = null
  }
  timeEl.style.fontSize = 16 * ratio + 'vw'
  dateEl.style.fontSize = 6 * ratio + 'vw'
}

setFontSizeRatio(scaleRatio)

/**
 * 添加设置图标
 */
function addSettings() {
  const settingsList = [
    {
      title: '字体缩放',
      name: '𝓕', action: () => {
        toggleFontSize()
      }
    },
    {
      title: 'Bing 壁纸',
      name: '𝓑', action: () => {
        toggleBing()
      }
    },
    {
      title: '黑白切换',
      name: '☯',
      action: toggleTheme
    },
    {
      title: '全屏切换',
      name: '⌗', action: () => {
        screenfull.toggle()
      }
    },
  ]

  settingsList.forEach(item => {
    const btn = document.createElement('button')
    btn.addEventListener('click', item.action)
    btn.innerText = item.name
    btn.title = item.title
    listEl.appendChild(btn)
  })
}

addSettings()

const BING_API = isProd ? 'http://zencode.top:9003' : '/bing'

function setBingWallpaper(clear = false) {
  if (clear) {
    document.body.style.backgroundImage = null
    footnoteTextEl.innerText = ''
    return
  }

  /**
   * 原接Bing口有跨域问题，需要使用反向代理
   * https://www.bing.com/HPImageArchive.aspx?format=js&idx=0&n=1
   */
  import('axios').then(({default: axios}) => {
    axios.get(BING_API + '/HPImageArchive.aspx?format=js&idx=0&n=1').then(res => {
      const {data} = res

      const image = data.images[0]
      const url = `https://www.bing.com${image.url}`
      console.log('Today Bing wallpaper', url, data)
      document.body.style.backgroundImage = `url('${url}')`
      footnoteTextEl.innerText = image.copyright
      footnoteTextEl.href = url
    }).catch(e => {
      console.error(e)
    })
  })

  // document.body.style.backgroundImage = `url('https://api.dujin.org/bing/1920.php')`
}
