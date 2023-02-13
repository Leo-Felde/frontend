import HomeView from '../views/HomeView.vue'

export default [
  {
    path: '/auth',
    name: 'Login',
    meta: {group: 'auth'},
    component: () => import(/* webpackChunkName: "Login" */ '../views/Auth/Index')
  },
  {
    path: '/auth/new',
    name: 'Create-account',
    meta: {group: 'auth'},
    component: () => import(/* webpackChunkName: "Login" */ '../views/Auth/Create')
  },
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/stats',
    name: 'Stats',
    component: () => import(/* webpackChunkName: "about" */ '../views/StatsView.vue')
  },
  {
    path: '/character',
    name: 'character',
    component: () => import(/* webpackChunkName: "about" */ '../views/Character/Index.vue')
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