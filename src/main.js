import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import Vuex from 'vuex'
import './styles.scss';
import vmodal from 'vue-js-modal'
import './registerServiceWorker';
import vuetify from './plugins/vuetify';
import syncoboxform from 'syncoboxform';


Vue.use(Vuex)
Vue.use(vuetify)
Vue.use(vmodal)
Vue.use(syncoboxform)
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App)
}).$mount('#app');
