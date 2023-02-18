import api from '../Api'

const prefix = 'auth'
const methods = {
  login (params) {
    return api.post(`${prefix}/login`, params)
  },

  cadastro (params) {
    return api.post(`${prefix}/new`, params)
  },

  logout () {
    return api.post(`${prefix}/logout`)
  }
}

export default methods