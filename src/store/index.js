import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import usuario from './modules/usuario'
import snackbar from './modules/snackbar'

export default new Vuex.Store({
  modules: {
    usuario: usuario,
    snackbar: snackbar
  }
})