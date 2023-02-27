import Vue from 'vue'
import Vuelidate from 'vuelidate'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'
import TextField from '@/components/TextField.vue'
import StylizedCard from '@/components/layout/StylizedCard.vue'
import PixelIcon from '@/components/PixelIcon.vue'
import snackbarPlugin from './plugins/snackbar'
import { longClickDirective } from 'vue-long-click'

import store from '@/store'

Vue.config.productionTip = false
Vue.use(snackbarPlugin, { store })

Vue.component('TextField', TextField)
Vue.component('StylizedCard', StylizedCard)
Vue.component('PixelIcon', PixelIcon)

Vue.use(Vuelidate)

const longClickInstance = longClickDirective({delay: 600, interval: 10000})
Vue.directive('longclick', longClickInstance)

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
