export const isProd = process.env.NODE_ENV === 'production'

const LS_KEY = 'AWOS_SETTINGS'

export function getSettingsLS() {
  const v = JSON.parse(localStorage.getItem(LS_KEY))
  return v
}

export function setSettingsLS(obj = {}) {
  localStorage.setItem(LS_KEY, JSON.stringify(obj))
}
