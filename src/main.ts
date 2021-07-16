import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import HueApp from 'local-hue-app'

Vue.config.productionTip = false
Vue.use(HueApp, { store })
import ConfigProvider from './ConfigProvider'

const hueBridgeIP = ConfigProvider.value('hueBridgeIP')
const hueUsername = ConfigProvider.value('hueUsername')


new Vue({
  router,
  store,
  beforeCreate: () => {
    store.dispatch('searchLocation', { })
    store.commit('SET_HUE_BRIDGE_INFO', { ip: hueBridgeIP, username: hueUsername })
  },
  render: h => h(App)
}).$mount('#app')
