import store from '../store'
import * as db from '../db/indexedDB'
export const USERNAME = 'hankhu@webim.com.tw'
export const PASSWORD = 's27h27o27w27'

export const apiToken = store.getters.getBaseURL + 'api/token'
export var token = ''
export function getToken () {
  return new Promise(resolve => {
    db.readData(db.TOKEN, "token")
      .then(data => {
        let nowDate = new Date()
        let time = (nowDate - data.date)/1000
        
        if (time > data.expires_in) {
          console.log("getNewToken time > data.expires_in", time, data.expires_in)
          getNewToken().then(token => {
            resolve(token)
          })
        } else {
          console.log("getDBToken time > data.expires_in", time, data.expires_in)
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

        db.writeData(db.TOKEN, data)
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
    db.readData(db.TOKEN, "token").then(data => {
      resolve(data.token)
    })
  })
}
