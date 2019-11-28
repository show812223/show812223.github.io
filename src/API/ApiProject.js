import store from '../store'
import * as apiToken from '../API/Token'

export const apiProject = store.getters.getBaseURL + 'api/Project/'

export function getProject () {
  return new Promise((resolve, reject) => {
    let url = new URL(apiProject)
    let searchParmas = new URLSearchParams({
      image: true
    })
    url.search = searchParmas
    apiToken.getToken().then(token => {
      fetch(url.href, {
        method: 'GET',
        headers: {
          Authorization: 'Bearer ' + token
        }
      }).then(response => {
        resolve(response.json())
      }).catch(error => {
        reject(error)
      })
    })
  })
}