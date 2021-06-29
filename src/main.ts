import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import HueApp from 'hue-app'

Vue.config.productionTip = false
Vue.use(HueApp, { store })

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
