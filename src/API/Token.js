import store from '../store'
import * as db from '../db/indexedDB'

export const apiToken = store.getters.getBaseURL + 'api/token'
export var token = ''
export function getToken () {
  var url = apiToken
  return new Promise(function (resolve, reject) {
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body:
        'grant_type=password&username=' +
        store.getters.getUsername +
        '&' +
        'password=' +
        store.getters.getPassword
    })
      .then(function (response) {
        response
          .clone()
          .json()
          .then(function (jsonData) {
            console.log('get token', jsonData)
            var obj = jsonData
            token = obj['access_token']
            let data = new Object
            data.id = "token"
            data.token = token

            db.writeData(db.TOKEN, data)
            .then(() => {
              return resolve(token)
            }).catch((error) => {
              return reject(error)
            })
          })
      })
      .catch(function (error) {
        db.readData(db.TOKEN, "token").then(data => {
          console.log('get offline token', data.token)
          return resolve(data.token)
        })
      })
  })
}
