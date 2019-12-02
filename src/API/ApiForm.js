import * as db from '../db/indexedDB'
import store from '../store'
import * as apiToken from './Token'
let url = new URL(store.getters.getBaseURL + 'api/Form/')
export function getForm () {
  return new Promise(function (resolve, reject) {
    db.readData(db.TOKEN, 'token').then(data => {
      var token = data.token
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

  })
}

export function getFormResult(formId){
  return new Promise((resolve, reject) => {
    apiToken.getToken().then(token => {
      let href = new URL( url.href + formId + "/result" )
      let searchParmas = new URLSearchParams({
        projectId: store.state.projectId
      })
      href.search = searchParmas
      console.log("project",store.state.projectId)
      fetch(href.href, {
        method: 'GET',
        headers: {
          Authorization: 'Bearer ' + token
        }
      }).then(res => {
        resolve(res.json())
      }).catch(error => {
        reject(error)
      })
    })
  })
}


