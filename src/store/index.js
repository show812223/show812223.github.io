import Vue from 'vue'
import Vuex from 'vuex'
import { state, mutations } from './mutations.js'
import * as getters from './getters.js'
import * as actions from './actions.js'
import createPersistedState from 'vuex-persistedstate' // vuex持續化儲存

Vue.use(Vuex)
export default new Vuex.Store({
  state:{
    rawData: [],
    taskData: [],
    stepData: [],
    pathData: [],
    formData: [],
    currentRowId: ""
  },
  mutations:{
    pushRawData: (state, data) => {
      state.rawData = data;
      state.taskData = [];
      state.taskData.push(data.flowTasks);
      state.pathData = [];
      state.pathData = data.flowPaths;
      console.log("raw data: ", data);
    },
    pushTaskData: (state, data) => {
      state.taskData = [];
      state.taskData.push(data);
    },
    pushStepData: (state, data) => {
      state.stepData.push(data);
    },
    pushPathData: (state, data) => {
      state.pathData = [];
      state.pathData = data;
    },
    // TODO: 資料變更
    pushLogicData: (state, data) => {
      var path = data[0];
      var s = state.pathData.find(e => e.id === path.pathId);

      s.logic = path.logic;
      s.jsonLogic = path.jsonLogic;
      console.log("*** state.pathData", state.pathData);
    },
    pushFormData: (state, data) => {
      state.formData = data;
    },
    pushFormSchema: (state, data) => {
      state.formData.find(e => e.name === data.id).formSchema = data.formSchema;
    }
  },
  getters:{
    getRawData: state => {
      return state.rawData;
    },
    formDatadataForPath: state => sourceid => {
      //formData不會儲存 sourceid，但是taskData有儲存，所以先用soucreid去TaskData撈現在的fomrid，再用formid去formData裡面撈包含schema的data並回傳
      const formid_fromTaskData = state.taskData[0].find(e => e.id === sourceid)
        .formId;
      const formdata = state.formData.find(e => e.name === formid_fromTaskData);
      return formdata;
    },
    getTaskData: state => id => {
      // console.log("taskData id : ", id);
      // console.log("state.taskData: " , state.taskData);
      if (state.taskData.length > 0) {
        const taskData = state.taskData[0].find(e => e.id === id);
        if (taskData) {
          // console.log("taskData: " ,taskData)
          return taskData;
        } else {
          // console.log("nothing")
          return taskData;
        }
      }
    },
    formDatadataForDiv: state => id => {
      const data = state.formData.find(e => e.name === id); //name
      return data;
    },
    stepDataForDiv: state => {
      return state.stepData[state.stepData.length - 1];
    },
    getPathTaskData: state => {
      const data = [state.taskData, state.pathData];
      return data;
    }
  },
  actions:{
    pushRawData(context, data) {
      context.commit("pushRawData", data);
    },
    pushTaskData(context, data) {
      context.commit("pushTaskData", data);
    },
    pushStepData(context, data) {
      context.commit("pushStepData", data);
    },
    pushPathData(context, data) {
      context.commit("pushPathData", data);
    },
    pushLogicData(context, data) {
      context.commit("pushLogicData", data);
    },
    pushFormData(context, data) {
      context.commit("pushFormData", data);
    },
    pushFormSchema(context, data) {
      context.commit("pushFormSchema", data);
    }
  },
  // strict: true,
  plugins: [createPersistedState()]
})
