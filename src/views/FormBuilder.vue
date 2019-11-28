<template>
  <div id="builder">
    <v-card>
      <v-container fluid>
        <v-layout wrap align-center>
          <v-flex xs12 sm6 md5>
            <v-text-field class="formTitle" label="標題" v-model="title" />
          </v-flex>
          <v-flex>
            <v-row  xs12 sm6 md4 justify="end">
               <v-btn class="toolBtn" depressed color="primary" @click="modal">modal</v-btn>
              <v-btn class="toolBtn" depressed color="primary" @click="saveForm">儲存編輯</v-btn>
            </v-row>
          </v-flex>
          <v-flex md12>
            
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
<FormBuilder v-bind:form="form"></FormBuilder>
    <modal name="hello-world">
      </modal>
  </div>
</template>

<script>
import { Component, Vue } from "vue-property-decorator";
import { FormBuilder,Form } from "vue-formio";
import * as db from '../db/indexedDB'
export default {
  name: 'formBuilder',
  data () {
    return{
      form: {},
      title:"",
      justify: 'end',
      alignment: 'center'
    }
  },
  methods:{
    saveForm(){
      let obj = {
        id: "ed8286ed-6a2a-4f1d-a219-e23b47463dc8",
        name: "HanHanSoCool",
        title: this.$data.title,
        form: this.$data.form
      }
      db.writeData(db.SYNC_FormSchema, obj).then(() => {
        navigator.serviceWorker.ready.then(sw => {
            sw.sync.register('sync-formSchema')
            // APIForm.postFormResult(result)
          })
      })
    },
    modal(){
      this.$modal.show('hello-world');
    }
  },
  components:{
    FormBuilder,
    Form
  }
}
</script>

<style>
.toolBtn{
  margin-right: 15px
}
.formTitle{
  margin-left: 15px;
}
</style>