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
  const token = Cookies.get('token') || sessionStorage.getItem('token')
  const usuario = Cookies.get('usuario') || sessionStorage.getItem('token')
  if ((!token || !usuario) && to.meta.group !== 'auth') {
    next({
      path: '/auth',
      replace: true
    })
  } else {
    const storedUsuario = store.state.usuario
    if (!storedUsuario){
      store.commit('setUsuario', JSON.parse(usuario))
    }

    next()
  }
})

export default router
