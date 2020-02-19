// import Vue from 'vue'
// import mutations from './mutations'
import * as types from './mutations_type.js'

export const setToken = ({ commit }, tokenString) => {
  commit(types.SETTOKEN, tokenString)
}

export const setProjectId = ({ commit }, id) => {
  commit(types.SET_PROJECTID, id)
}

export const pushRawData = ({commit}, data) => {
  commit(types.pushRawData,data)
}

export const pushTaskDat = ({commit}, data) => {
  commit(types.pushTaskData,data)
}

export const pushStepData = ({commit}, data) => {
  commit(types.pushStepData,data)
}

export const pushPathData = ({commit}, data) => {
  commit(types.pushPathData,data)
}

export const pushLogicData = ({commit}, data) => {
  commit(types.pushLogicData,data)
}

export const pushFormData = ({commit}, data) => {
  commit(types.pushFormData,data)
}

export const pushFormSchema = ({commit}, data) => {
  commit(types.pushFormSchema,data)
}
