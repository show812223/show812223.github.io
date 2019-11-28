import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import Vuex from 'vuex'
import vmodal from 'vue-js-modal'
import '../src/styles.scss'
import i18n from './i18n'


Vue.use(Vuex)
Vue.use(vuetify);
Vue.use(vmodal)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  i18n,
  render: h => h(App)
}).$mount('#app')


