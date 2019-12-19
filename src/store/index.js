import Vue from 'vue'
import Vuex from 'vuex'
import { state, mutations } from './mutations.js'
import * as getters from './getters.js'
import * as actions from './actions.js'
import createPersistedState from 'vuex-persistedstate' // vuex持續化儲存

Vue.use(Vuex)
export default new Vuex.Store({
  state,
  mutations,
  getters,
  actions,
  strict: true,
  plugins: [createPersistedState()]
})
