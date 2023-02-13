import api from '../Api'

const methods = {
  login (params) {
    return api.post('auth/login', params)
  },

  cadastro (params) {
    return api.post('auth/new', params)
  },

  logout () {
    return api.post('auth/logout')
  }
}

export default methods