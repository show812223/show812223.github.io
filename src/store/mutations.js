import * as types from './mutations_type.js'
// import Vue from 'vue'

// state
export const state = {
  token: ''
}

// mutations
export const mutations = {
  [types.SETTOKEN] (state, tokenString) {
    state.token = tokenString
  }
}
