import qs from "qs"

export function getQueryObj() {
  return qs.parse(location.search.slice(1))
}

/**
 * 更新query
 * @param obj
 */
export function updateQuery(obj) {
  const query = getQueryObj()

  for (let key in obj) {
    if (obj[key] === null) {
      delete query[key]
      delete obj[key]
    }
  }

  const queryString = qs.stringify({...query, ...obj})

  if (history.pushState) {
    const newurl = window.location.protocol + "//" + window.location.host + window.location.pathname +
      (queryString ? ('?' + queryString) : '')
    window.history.pushState({path: newurl}, '', newurl);
  } else {
    location.search = queryString
  }
}

const LS_KEY = 'LITE_CLOCK_SETTINGS'

export function getSettingsLS() {
  return qs.parse(localStorage.getItem(LS_KEY)) || {}
}

export function updateSettingsLS(obj) {
  const query = getSettingsLS()

  for (let key in obj) {
    if (obj[key] === null) {
      delete query[key]
      delete obj[key]
    }
  }
  const queryString = qs.stringify({...query, ...obj})
  localStorage.setItem(LS_KEY, queryString)
}

export const isProd = process.env.NODE_ENV === 'production'
