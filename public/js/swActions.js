// importScripts('/js/db/p_idb.js');
// importScripts('/js/db/p_indexedDB.js')

const USERNAME = 'hankhu@webim.com.tw'
const PASSWORD = 's27h27o27w27'
const baseURL = 'https://stanteccms-dev.webim.io/'
const apiFormResult = baseURL + 'api/Result/'
const apiToken = baseURL + 'api/token'
const apiForm = baseURL + 'api/Form/'

function getToken () {
  return new Promise(resolve => {
    readData(TOKEN, "token")
      .then(data => {
        let nowDate = new Date()
        let time = (nowDate - data.date)/1000
        
        if (time > data.expires_in) {
          console.log("time > data.expires_in", time, data.expires_in)
          getNewToken().then(token => {
            resolve(token)
          })
        } else {
          console.log("time > data.expires_in", time, data.expires_in)
          getDBToken().then(token => {
            resolve(token)
          })
        }
      })
      .catch(error => {
        console.log("catch error")
        getNewToken().then(token => {
          resolve(token)
        })
      })
  })
}

function getNewToken () {
  return new Promise((resolve, reject) => {
    fetch(apiToken, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body:
        'grant_type=password&username=' + USERNAME + '&' + 'password=' + PASSWORD
    }).then(function (response) {
      response.clone().json().then(function (jsonData) {
        var obj = jsonData
        token = obj['access_token']
        let data = new Object
        data.id = "token"
        data.token = token
        data.expires_in = obj['expires_in']
        data.date = new Date()

        writeData(TOKEN, data)
          .then(() => {
            resolve(token)
          }).catch((error) => {
            reject(error)
          })
      })
    })
  })
}

function getDBToken () {
  return new Promise((resolve) => {
    readData(TOKEN, "token").then(data => {
      resolve(data.token)
    })
  })
}

function ActionPostFormResults () {
  readAllData(SYNC_POST)
    .then(function (datas) {
      console.log("readSyncData success", datas)
      for (var data of datas) {
        console.log('[SW] sync DB Data', data)
        postFormResult(data)
      }
    })
    .catch(function (err) {
      console.log('readSyncData Error', err)
    })
}

function postFormResult (data) {
  var formResult = data['formResult']
  var jsonString = JSON.stringify(formResult)
  var id = data['id']
  console.log('fetch form data', data)
  getToken().then(token => {
    var url = apiFormResult + data["formId"] +
      "?projectId=" + data["projectId"] + "&resultId=" + data["id"] + "&title=" + data["title"] + "&templateId=" + data["templsteId"] + "versionId=" + data["formVersionId"]
    fetch(url, {
      method: 'POST',
      headers: {
        "Content-type": "application/json;charset=UTF-8",
        "Authorization": "Bearer " + token
      },
      body: jsonString
    }).then(function (response) {
      console.log("送出表單", response)
      if (response.status === 200) {
        console.log("response.status", response.status)
        deleteData(SYNC_POST, id)
      }
    }).catch(function (error) {
      console.log("POST表單失敗", error)
    })
  })
}

// [SW] post表單結構
function ActionPostFormSchema(){
  console.log("ActionPostFormResults")
  readAllData(SYNC_FormSchema).then(datas => {
    for(var data of datas){
      postFormSchema(data)
    }
  }).catch(function (err) {
    console.error('Error', err)
  })

}

function postFormSchema(data){
  
  var id  = data["id"]
  var obj = data.form
  var json = JSON.stringify(obj);
  console.log("data",obj)
  var blob = new Blob([json], {
    type: 'application/json'
  });
  var form = new FormData();
  form.append("form",blob);

  getToken().then(token => {
    var url = new URL(apiForm)
    let searchParmas = new URLSearchParams({
      name: data["name"],
      formId: id
    })
    url.search = searchParmas
    console.log("post schema",url.href)
    fetch(url.href+"&=", {
      method: 'POST',
      body: form,
      headers: {
        "authorization": "Bearer " + token
      }
    }).then(function (response) {
      console.log("送出 form schema", response)
      if (response.status === 200) {
        console.log("response.status", response.status)
        deleteData(SYNC_FormSchema, id)
      }
    }).catch(function (error) {
      console.log("POST表單失敗", error)
    })
  })
}