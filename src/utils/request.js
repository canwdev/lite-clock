// fix unable to verify the first certificate
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0

// 封装 axios
import axios from 'axios'

const service = axios.create({
  baseURL: '',
  timeout: 10000 // request timeout
})

service.interceptors.request.use(
  config => {
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

service.interceptors.response.use(
  (response) => {
    return response.data
  },
  (error) => {
    // console.error('request error', error)
    return Promise.reject(error)
  }
)

export default service
