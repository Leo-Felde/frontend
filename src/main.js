import Vue from 'vue'
import Vuelidate from 'vuelidate'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'
import TextField from '@/components/TextField.vue'
import StylizedCard from '@/components/layout/StylizedCard.vue'
import PixelIcon from '@/components/PixelIcon.vue'

Vue.config.productionTip = false

Vue.component('TextField', TextField)
Vue.component('StylizedCard', StylizedCard)
Vue.component('PixelIcon', PixelIcon)

Vue.use(Vuelidate)

new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
