
import store from '../store'
import * as apiToken from './Token'
import { resolve } from 'q';
let url = new URL(store.getters.getBaseURL + 'api/FormGroup/')
export function getFormGroup(){
  return new Promise((resolve, reject) => {
    apiToken.getToken().then(token => {
      fetch(url.href+"0", {
        method: 'GET',
        headers: {
          Authorization: 'Bearer ' + token
        }
      }).then(res => {
        return resolve(res.json())
      }).catch(error => {
        return reject(error)
      })
    })
  })
}