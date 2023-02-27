import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'
import Cookies from 'js-cookie'
import store from '@/store'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  routes
})

router.beforeEach((to, from, next)=>{
  const token = Cookies.get('token')
  const usuario = Cookies.get('usuario')
  
  if (to.meta.group === 'auth') {
    next()
    return
  }

  const dadosInvalidos = (token === 'null' || token === null) || (usuario === 'null' || usuario === null)

  if (dadosInvalidos) {
    next({
      path: '/auth',
      replace: true
    })
    return
  }

  const storedUsuario = store.state.usuario.dados
  if (!storedUsuario){
    store.commit('usuario/setUsuario', JSON.parse(usuario))
  }

  next()
})

export default router
