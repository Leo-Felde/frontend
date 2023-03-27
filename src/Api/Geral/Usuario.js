import api from '../Api'

const prefix = 'usuario'
const methods = {
  carregar (id) {
    return api.get(`${prefix}/carregar/${id}`)
  },

  salvar (params) {
    return api.post(`${prefix}/salvar`, params)
  },

  comprarItem (params) {
    return api.post(`${prefix}/comprarItem`, params)
  },

  buscarAtividadeSemanal (id) {
    return api.get(`${prefix}/buscarAtividadeSemanal/${id}`)
  },

  listarInventario (id) {
    return api.get(`${prefix}/listarInventario/${id}`)
  }
}

export default methods