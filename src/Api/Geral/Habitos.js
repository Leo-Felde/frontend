import api from '../Api'

const prefix = 'habito'
const methods = {
  listar (id) {
    return api.get(`${prefix}/listar/${id}`)
  },

  salvar (params) {
    return api.post(`${prefix}/salvar`, params)
  },

  excluir (id) {
    return api.delete(`${prefix}/excluir/${id}`)
  },

  carregar (id) {
    return api.get(`${prefix}/carregar/${id}`)
  }
}

export default methods