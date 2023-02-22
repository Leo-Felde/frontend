import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'
import Cookies from 'js-cookie'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  routes
})

router.beforeEach((to, from, next)=>{
  const token = Cookies.get('token') || sessionStorage.getItem('token')
  if (!token && to.meta.group !== 'auth') {
    next({
      path: '/auth',
      replace: true
    })
  } else {
    next()
  }
})

export default router
