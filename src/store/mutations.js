import * as types from './mutations_type.js'
// import Vue from 'vue'

// state
export const state = {
  baseURL: 'https://stanteccms-dev.webim.io/',
  token: '123',
  username: 'hankhu@webim.com.tw',
  password: 's27h27o27w27',
  projectId: ''

}

// mutations
export const mutations = {
  [types.SETTOKEN] (state, tokenString) {
    state.token = tokenString
  },
  [types.SET_PROJECTID] (state, id) {
    state.projectId = id
  }
}
