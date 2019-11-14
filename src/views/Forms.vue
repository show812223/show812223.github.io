<template>
  <div>
    <v-text-field  label="標題" outlined v-model="title"></v-text-field>
    <formio id='formRender' :form='formComponent' v-on:submit='submit'></formio>
  </div>
</template>

<script>
import { Form } from 'vue-formio'
import Token from '../API/Token'
import APIForm from '../API/ApiForm'
import uuidv1 from 'uuid/v1'
import * as db from '../db/indexedDB.js'

export default {
  name: 'forms',
  data () {
    return {
      formComponent: {
        display: 'form',
        components: []
      },
      title: ''
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
            sw.sync.register('sync-new-post')
              .then(() => {
                console.log('background sync 已觸發')
              })
              .catch(() => {
                console.log('background sync 觸發失敗')
              })
          })
        })
      })
    },
    setFormResultToObject (submission) {
      return new Promise(resolve => {
        var obj = {}
        obj.id = uuidv1()
        obj.title = this.$data.title
        obj.formResult = {
          formId: '0d86a364-9fb8-4ee6-81df-f103636ca293',
          formData: submission,
          projectId: '1'
        }
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
      APIForm.getForm(token).then(obj => {
        this.formComponent = {
          display: 'form',
          components: obj['Components']
        }
      })
    })
  }
}

</script>
