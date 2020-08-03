import request from './request'
import store from '@/store'

export function getData() {
  return request.get(store.getters.dataApiUrl, {
    params: {
      t: Date.now()
    }
  })
}
