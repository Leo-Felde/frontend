import axios from 'axios'
import Cookies from 'js-cookie'

let cancel

const instance = axios.create({
  baseURL: 'http://127.0.0.1:8000/api',
  headers: {  
    'Content-Type': 'application/json',
  },
  validateStatus: function (status) {
    return status >= 200 && status < 300
  },
  cancelToken: new axios.CancelToken(c => (cancel = c)),
  ignoreCancel: true
})

instance.interceptors.request.use(
  config => {
    if (cancel) {
      cancel()
    }

    // Add authorization header
    const token = Cookies.get('token')
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }

    config.cancelToken = new axios.CancelToken(c => (cancel = c))
    return config
  },
  error => Promise.reject(error)
)

instance.interceptors.response.use(
  response => response,
  error => {
    if (axios.isCancel(error)) {
      return Promise.resolve({
        data: null,
        status: 'canceled',
        statusText: 'Request canceled'
      })
    } else {
      return Promise.reject(error)
    }
  }
)

export default instance