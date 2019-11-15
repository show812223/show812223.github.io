import * as types from './mutations_type.js'
// import Vue from 'vue'

// state
export const state = {
  baseURL: 'https://stanteccms-dev.webim.io/',
  token: '',
  username: 'hankhu@webim.com.tw',
  password: 's27h27o27w27'
}

// mutations
export const mutations = {
  [types.SETTOKEN] (state, tokenString) {
    state.token = tokenString
  }
}
