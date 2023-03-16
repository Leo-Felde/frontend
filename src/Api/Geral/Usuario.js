import api from '../Api'

const prefix = 'usuario'
const methods = {
  carregar (id) {
    return api.get(`${prefix}/carregar/${id}`)
  },

  salvar (params) {
    return api.post(`${prefix}/salvar`, params)
  },

  buscarAtividadeSemanal (id) {
    return api.get(`${prefix}/buscarAtividadeSemanal/${id}`)
  }
}

export default methods