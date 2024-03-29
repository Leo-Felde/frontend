import api from '../Api'

const prefix = 'tarefa'
const methods = {
  listar (id) {
    return api.get(`${prefix}/listar/${id}`)
  },

  salvar (params) {
    return api.post(`${prefix}/salvar`, params)
  },

  carregar (id) {
    return api.get(`${prefix}/carregar/${id}`)
  },

  excluir (id) {
    return api.delete(`${prefix}/excluir/${id}`)
  },
  
  concluirTarefa (params) {
    return api.post(`${prefix}/concluirTarefa`, params)
  },

  cancelarTarefa (params) {
    return api.post(`${prefix}/cancelarTarefa`, params)
  },

  vincularTarefa (params) {
    return api.post(`${prefix}/vincularTarefa`, params)
  }
}

export default methods