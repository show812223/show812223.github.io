import * as db from '../db/indexedDB'
import store from '../store'
// const apiForm = store.getters.getBaseURL + 'api/Form/0d86a364-9fb8-4ee6-81df-f103636ca293' // 客變表單
// const apiFormResult = store.getters.getBaseURL + 'api/Result'
export function getForm () {
  return new Promise(function (resolve, reject) {
    var token = store.getters.getToken
    var url = store.getters.getBaseURL + 'api/Form/0d86a364-9fb8-4ee6-81df-f103636ca293'
    fetch(url, {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + token
      }
    })
      .then(function (response) {
        return response.json()
      })
      .then(function (json) {
        return resolve(json)
      })
      .catch(function (error) {
        return reject(error)
      })
  })
}

export function postFormResult (data) {
  var formResult = data['formResult']
  var jsonString = JSON.stringify(formResult)
  var id = data['id']
  console.log('fetch form data', data)
  var token = store.getters.getToken
  var url = store.getters.getBaseURL + "api/Result/"+data["formId"]+
    "?projectId="+data["projectId"]+"&resultId="+data["id"]+"&title="+data["title"]+"&templateId="+data["templsteId"]+"versionId="+data["formVersionId"]
    console.log(url) 
    fetch(url,{
        method:'POST',
        headers:{
            "Content-type": "application/json;charset=UTF-8",
            "Authorization":"Bearer "+token
        },
        body:jsonString
    }).then(function(response){
        console.log("送出表單",response)
        if(response.ok){
            deleteData(SYNC_POST,id)
        }
    }).catch(function(error){
        console.log("POST表單失敗",error)
    })
}
