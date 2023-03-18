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

// import firebase from 'firebase/app'
// import 'firebase/messaging'

import store from '@/store'


// const firebaseConfig = {
//   apiKey: 'AIzaSyDdRCm1WiTHvvyssx9AHKk4ZdH26PA1zUU',
//   authDomain: 'mypath-50fae.firebaseapp.com',
//   projectId: 'mypath-50fae',
//   storageBucket: 'mypath-50fae.appspot.com',
//   messagingSenderId: '418786796894',
//   appId: '1:418786796894:web:ee05a9926bc99cf3475bcf'
// }
// firebase.initializeApp(firebaseConfig)

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
