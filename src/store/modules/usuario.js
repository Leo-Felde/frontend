export default {
  namespaced : true,
  state: {
    dados: null
  },

  mutations: {
    setUsuario (state, payload) {
      state.dados = payload
    }
  }
  
}