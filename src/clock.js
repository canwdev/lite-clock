import moment from 'moment'

/**
 * https://stackoverflow.com/a/29972322
 * @param callback
 */
function timer(callback) {
  const interval = 1000
  let expected = Date.now() + interval
  setTimeout(step, interval)

  function step() {
    const dt = Date.now() - expected // the drift (positive for overshooting)
    if (dt > interval) {
      console.warn('something really bad happened. Maybe the browser (tab) was inactive?\npossibly special handling to avoid futile "catch up" run')
    }
    callback()
    expected += interval
    setTimeout(step, Math.max(0, interval - dt)) // take into account drift
  }
}

const acc_time = document.getElementById('acc_time')
const acc_date = document.getElementById('acc_date')
moment.locale(navigator.language || 'zh-CN')
let lastDateText = null

function updateTime() {
  const dt = new Date()
  acc_time.innerText = moment(dt).format('HH:mm:ss')

  const dateText = moment(dt).format('LL dddd')
  if (dateText !== lastDateText) {
    acc_date.innerText = dateText
    lastDateText = dateText
  }
}

updateTime()
timer(updateTime)
