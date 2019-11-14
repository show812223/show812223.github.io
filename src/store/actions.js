// import Vue from 'vue'
// import mutations from './mutations'
import * as types from './mutations_type.js'

export const setToken = ({ commit }, tokenString) => {
  commit(types.SETTOKEN, tokenString)
}
