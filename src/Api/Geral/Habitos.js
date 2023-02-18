import api from '../Api'

const prefix = 'habito'
const methods = {
  listar (params) {
    return api.get(`${prefix}/listar`, params)
  },

  salvar (params) {
    return api.post(`${prefix}/salvar`, params)
  },

  carregar (id) {
    return api.get(`${prefix}/carregar/${id}`)
  }
}

export default methods