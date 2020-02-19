

// // 其昌
// export var getRawData = state => {
//   return state.rawData;
// };
// export var formDatadataForPath = state => sourceid => {
//   //formData不會儲存 sourceid，但是taskData有儲存，所以先用soucreid去TaskData撈現在的fomrid，再用formid去formData裡面撈包含schema的data並回傳
//   const formid_fromTaskData = state.taskData[0].find(e => e.id === sourceid)
//     .formId;
//   const formdata = state.formData.find(e => e.name === formid_fromTaskData);
//   return formdata;
// };
// export var getTaskData = state => id => {
//   // console.log("taskData id : ", id);
//   // console.log("state.taskData: " , state.taskData);
//   console.log("*** state.taskData",state.taskData) // TODO:沒東西
//   if (state.taskData.length > 0) {
//     const taskData = state.taskData[0].find(e => e.id === id);
//     if (taskData) {
//       console.log("*** getTaskData",taskData)
//       return taskData;
//     } else {
//       console.log("*** getTaskData",taskData)
//       return taskData;
//     }
//   }
// };
// export var formDatadataForDiv = state => id => {
//   const data = state.formData.find(e => e.name === id); //name
//   return data;
// };
// export var stepDataForDiv = state => {
//   return state.stepData[state.stepData.length - 1];
// };
// export var getPathTaskData = state => {
//   const data = [state.taskData, state.pathData];
//   return data;
// };
