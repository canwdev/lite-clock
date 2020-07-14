import './assets/style/watch.styl'

const clock = document.querySelector('#utility-clock')
utilityClock(clock)

if (clock.parentNode.classList.contains('fill')) autoResize(clock, 295 + 32)

function utilityClock(container) {
  const minuteText = function (n) {
    const element = document.createElement('div')
    element.className = 'minute-text'
    element.innerHTML = (n < 10 ? '0' : '') + n
    position(element, n / 60, 135)
    dynamic.appendChild(element)
  }
  const rotate = function (element, second) {
    element.style.transform = element.style.webkitTransform = 'rotate(' + (second * 6) + 'deg)'
  }
  const position = function (element, phase, r) {
    const theta = phase * 2 * Math.PI
    element.style.top = (-r * Math.cos(theta)).toFixed(1) + 'px'
    element.style.left = (r * Math.sin(theta)).toFixed(1) + 'px'
  }
  const minuteLine = function (n) {
    const anchor = document.createElement('div')
    anchor.className = 'anchor'
    const element = document.createElement('div')
    element.className = 'element minute-line'
    rotate(anchor, n)
    anchor.appendChild(element)
    dynamic.appendChild(anchor)
  }
  const dynamic = container.querySelector('.dynamic')
  const hourElement = container.querySelector('.hour')
  const minuteElement = container.querySelector('.minute')
  const secondElement = container.querySelector('.second')
  const minute = function (n) {
    return n % 5 === 0 ? minuteText(n) : minuteLine(n)
  }
  const hour = function (n) {
    const element = document.createElement('div')
    element.className = 'hour-text hour-' + n
    element.innerHTML = n
    position(element, n / 12, 105)
    dynamic.appendChild(element)
  }
  const animate = function () {
    const now = new Date()
    const time = now.getHours() * 3600 +
      now.getMinutes() * 60 +
      now.getSeconds() +
      now.getMilliseconds() / 1000
    rotate(secondElement, time)
    rotate(minuteElement, time / 60)
    rotate(hourElement, time / 60 / 12)
    requestAnimationFrame(animate)
  }
  for (let i = 1; i <= 60; i++) minute(i)
  for (let i = 1; i <= 12; i++) hour(i)
  animate()
}

function autoResize(element, nativeSize) {
  const update = function () {
    const scale = Math.min(window.innerWidth, window.innerHeight) / nativeSize
    element.style.transform = element.style.webkitTransform = 'scale(' + scale.toFixed(3) + ')'
  }
  update()
  window.addEventListener('resize', update)
}
