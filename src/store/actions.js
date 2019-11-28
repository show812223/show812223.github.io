// import Vue from 'vue'
// import mutations from './mutations'
import * as types from './mutations_type.js'

export const setToken = ({ commit }, tokenString) => {
  commit(types.SETTOKEN, tokenString)
}

export const setProjectId = ({ commit }, id) => {
  commit(types.SET_PROJECTID, id)
}
