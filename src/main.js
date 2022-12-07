import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'
import TextField from '@/components/TextField.vue'
import StylizedCard from '@/components/layout/StylizedCard.vue'

Vue.config.productionTip = false

Vue.component('TextField', TextField)
Vue.component('StylizedCard', StylizedCard)

new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
