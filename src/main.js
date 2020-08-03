import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import '@/assets/styles/normalize.css'
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'

import '@/assets/styles/base.styl'

Vue.use(Buefy)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
