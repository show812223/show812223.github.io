<script>
import Token from '../API/Token'
// import store from '../../store'
const apiForm = Token.baseURL + 'api/Form/0d86a364-9fb8-4ee6-81df-f103636ca293'// 客變表單
function getForm (token) {
  var url = apiForm
  return new Promise(function (resolve, reject) {
    console.log('get Form token', token)
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

export default {
  apiForm,
  getForm
}
</script>
