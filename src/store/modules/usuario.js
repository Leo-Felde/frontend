export default {
  namespaced : true,
  state: {
    dados: null,
    mostrouNotificacao: false
  },

  mutations: {
    setUsuario (state, payload) {
      state.dados = payload
    },

    setNotificacao (state, payload) {
      state.mostrouNotificacao = payload
    }
  }
  
}