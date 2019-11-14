<script>
// import { mapActions } from 'vuex'
import store from '../../store'

const myUsername = 'hankhu@webim.com.tw'
const myPassword = 's27h27o27w27'
const baseURL = 'https://stanteccms-dev.webim.io/'
const apiToken = baseURL + 'api/token'
var token = ''
function getToken () {
  var url = apiToken
  return new Promise(function (resolve, reject) {
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body:
        'grant_type=password&username=' +
        myUsername +
        '&' +
        'password=' +
        myPassword
    })
      .then(function (response) {
        response
          .clone()
          .json()
          .then(function (jsonData) {
            console.log('get token', jsonData)
            var obj = jsonData
            token = obj['access_token']
            store.dispatch('setToken', token).then(() => {
              return resolve(token)
            }).catch((error) => {
              return reject(error)
            })
          })
      })
      .catch(function (error) {
        return reject(error)
      })
  })
}

export default {
  myUsername,
  myPassword,
  baseURL,
  apiToken,
  token,
  getToken
}
</script>
