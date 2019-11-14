<template>
  <div>
    <formio id='formRender' :form='formComponent'></formio>
  </div>
</template>

<script>
import { Form } from 'vue-formio'
import Token from '../components/API/Token'
import APIForm from '../components/API/ApiForm'

export default {
  name: 'forms',
  data () {
    return {
      formComponent: {
        display: 'form',
        components: this.components
      },
      components: []
    }
  },
  components: {
    formio: Form
  },
  props: [],
  methods: {},
  beforeMount () {
    Token.getToken().then(token => {
      APIForm.getForm(token).then(obj => {
        this.formComponent = {
          display: 'form',
          components: obj['Components'] }
        //   .then(form => {
        //     console.log('FormIO 表單設定完成')
        //     form.on('submit', function (submission) {
        //       console.log('送單')
        //     })
        //   })
      })
    })
  }
}
</script>
