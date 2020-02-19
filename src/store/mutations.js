import * as types from "./mutations_type.js";
// import Vue from 'vue'

// state
export const state = {
  baseURL: "https://stanteccms-dev.webim.io/",
  token: "123",
  username: "hankhu@webim.com.tw",
  password: "s27h27o27w27",
  projectId: "",
  rawData: [],
  taskData: [],
  stepData: [],
  pathData: [],
  formData: [],
  currentRowId: ""
};

// mutations
export const mutations = {
  [types.SETTOKEN](state, tokenString) {
    state.token = tokenString;
  },
  [types.SET_PROJECTID](state, id) {
    state.projectId = id;
  },
  pushRawData: (state, data) => {
    state.rawData = data;
    state.taskData = [];
    state.taskData.push(data.flowTasks);
    state.pathData = [];
    state.pathData = data.flowPaths;
    console.log("raw data: ", data);
  },
  [types.pushTaskData](state,id){
    state.taskData = [];
    state.taskData.push(data);
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
};
