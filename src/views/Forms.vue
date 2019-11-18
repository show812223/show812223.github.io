<template>
  <div>
    <v-text-field  label="標題" outlined v-model="title"></v-text-field>
    <formio id='formRender' :form='formComponent' v-on:submit='submit'></formio>
  </div>
</template>

<script>
import { Form } from 'vue-formio'
import * as Token from '../API/Token'
import * as APIForm from '../API/ApiForm'
import uuidv1 from 'uuid/v1'
import * as db from '../db/indexedDB'

export default {
  name: 'forms',
  data () {
    return {
      formComponent: {
        display: 'form',
        components: []
      },
      title: '',
      publicPath: process.env.BASE_URL
    }
  },
  components: {
    formio: Form
  },
  props: [],
  methods: {
    submit (submission) {
      this.setFormResultToObject(submission).then(result => {
        
        db.writeData(db.SYNC_POST, result).then(() => {
          navigator.serviceWorker.ready.then(sw => {
            APIForm.postFormResult(result)
              // .then(() => {
              //   console.log('background sync 已觸發')
              // })
              // .catch(() => {
              //   console.log('background sync 觸發失敗')
              // })
          })
        })
      })
    },
    setFormResultToObject (submission) {
      return new Promise(resolve => {
        var obj = {}
        obj.id = uuidv1()
        obj.title = this.$data.title
        var res =  {
          formId: '0d86a364-9fb8-4ee6-81df-f103636ca293',
          formData: submission,
          projectId: '1'
        }
        obj.formResult = JSON.stringify(res)
        obj.formId = '0d86a364-9fb8-4ee6-81df-f103636ca293'
        obj.formVersionId = 122
        obj.templsteId = 99
        obj.projectId = 1
        obj.parentResultId = ''
        obj.date = Date.now()
        resolve(obj)
      })
    }
  },
  beforeMount () {
    Token.getToken().then(token => {
      APIForm.getForm().then(obj => {
        this.formComponent = {
          display: 'form',
          components: obj['Components']
        }
      })
    })
  }
}

</script>
