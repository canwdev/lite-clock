import screenfull from 'screenfull'
import moment from 'moment'
import {getSettingsLS, isProd, updateSettingsLS} from '@/utils'

const rootEl = document.getElementById('root')
const toggleEl = document.getElementById('settings_toggle')
const listEl = document.getElementById('settings_list')
const timeEl = document.getElementById('acc_time')
const dateEl = document.getElementById('acc_date')
const footnoteTextEl = document.getElementById('footnote_text')
const queryObj = getSettingsLS()

// 常量定义
const BING_API = isProd ? 'https://zencode.top:9003' : '/bing'
const LS_BING_DATA = 'LITE_CLOCK_BING_WALLPAPER'
let timeoutBingWallpaper = null
let retryTimes = 0 // 防止死循环

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
  updateSettingsLS({
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
  updateSettingsLS({
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
  updateSettingsLS({
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
      name: 'F', action: () => {
        toggleFontSize(scaleRatio)
      }
    },
    {
      title: 'Bing 壁纸',
      name: 'B', action: () => {
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


function setBingWallpaper(clear = false) {

  const retryFail = retryTimes > 3
  if (clear || retryFail) {
    if (retryFail) {
      console.log('重试3遍仍然失败，取消请求')
      retryTimes = 0
    }
    clearTimeout(timeoutBingWallpaper)
    document.body.style.backgroundImage = null
    footnoteTextEl.innerText = ''
    localStorage.removeItem(LS_BING_DATA)
    return
  }

  const lsData = JSON.parse(localStorage.getItem(LS_BING_DATA) || 'null')
  const expireTime = bingWallpaperExpireTime(lsData)

  if (lsData && expireTime > 0) {
    setBingWallpaperDOM(lsData)
    autoUpdateBingWallpaper({expireTime})
    return
  }

  /**
   * 原接Bing口有跨域问题，需要使用反向代理
   * https://www.bing.com/HPImageArchive.aspx?format=js&idx=0&n=1
   */
  import('axios').then(({default: axios}) => {
    axios.get(BING_API + '/HPImageArchive.aspx?format=js&idx=0&n=1').then(res => {
      const {data} = res

      setBingWallpaperDOM(data)
      console.log('Bing壁纸更新！', moment(Date.now()).format('HH:mm:ss LL dddd'), data)

      localStorage.setItem(LS_BING_DATA, JSON.stringify(data))
      autoUpdateBingWallpaper({data})
      retryTimes = 0
    }).catch(e => {
      console.error(e)
      retryTimes++
    })
  })


  // document.body.style.backgroundImage = `url('https://api.dujin.org/bing/1920.php')`
}

function setBingWallpaperDOM(data) {
  const image = data.images[0]
  const url = `https://www.bing.com${image.url}`
  document.body.style.backgroundImage = `url('${url}')`
  footnoteTextEl.innerText = image.copyright
  footnoteTextEl.href = url
}

/**
 * 获取Bing壁纸到期时间
 */
function bingWallpaperExpireTime(data) {
  if (!data) return 0

  const image = data.images[0]
  const endDateStr = image.enddate
  const year = Number.parseInt(endDateStr.substr(0, 4))
  const month = Number.parseInt(endDateStr.substr(4, 2))
  const day = Number.parseInt(endDateStr.substr(6, 2))

  const expireDate = new Date(year, month - 1, day + 1)
  const now = new Date()
  console.log('Bing壁纸过期时间', moment(expireDate).from(now))
  return expireDate - now
}

function autoUpdateBingWallpaper({data, expireTime}) {
  clearTimeout(timeoutBingWallpaper)

  if (!expireTime) {
    expireTime = bingWallpaperExpireTime(data)
  }

  // 定时自动刷新 Bing 壁纸（延迟1小时）
  expireTime += 600000

  timeoutBingWallpaper = setTimeout(setBingWallpaper, expireTime)
  console.log('下次Bing壁纸更新时间', moment(Date.now() + expireTime).format('HH:mm:ss LL dddd'))
}
