import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/auth',
    name: 'Login',
    component: () => import(/* webpackChunkName: "Login" */ '../views/Auth/Index')
  },
  {
    path: '/auth/new',
    name: 'Create-account',
    component: () => import(/* webpackChunkName: "Login" */ '../views/Auth/Create')
  },
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'home',
    component: HomeView
  },
  {
    path: '/tasks',
    name: 'tasks',
    component: () => import(/* webpackChunkName: "about" */ '../views/tasks/index.vue')
  },
  {
    path: '/shop',
    name: 'shop',
    component: () => import(/* webpackChunkName: "about" */ '../views/ShopView.vue')
  }, 
  {
    path: '/about',
    name: 'about',
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }, 
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
