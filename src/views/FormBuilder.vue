<template>
  <div>
    <!-- <v-card>
      <v-container fluid>
        <v-layout align-center>
          <v-flex xs12 sm6 md5>
            <v-text-field class="formTitle" label="標題" v-model="title" />
          </v-flex>
          <v-flex>
            <v-row xs12 sm6 md4 justify="end">
              <v-btn class="toolBtn" depressed color="primary" @click="showDialog('preview')">預覽</v-btn>
              <v-btn class="toolBtn" depressed color="primary" @click="saveForm">儲存編輯</v-btn>
            </v-row>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>-->
    <v-toolbar dense class="toolBar mb-5">
      <v-toolbar-title>{{formTitle}}</v-toolbar-title>
      <v-spacer />
      <v-toolbar-items>
        <v-btn icon>
          <v-icon>arrow_back</v-icon>
        </v-btn>
        <v-btn icon>
          <v-icon>arrow_forward</v-icon>
        </v-btn>
        <v-btn icon>
          <v-icon>refresh</v-icon>
        </v-btn>
        <v-btn icon @click="showDialog('preview')">
          <v-icon>remove_red_eye</v-icon>
        </v-btn>
        <v-btn rounded small dark color="light-green lighten-3" @click="saveForm">
          <v-icon>save</v-icon>
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-card class="scroll" width="100%" :height="cardHeight">
      <div class="pa-5">
        <div ref="formBuilder">
          <v-progress-linear indeterminate rounded height="6"></v-progress-linear>
        </div>
      </div>
    </v-card>

    <v-dialog v-model="previewDialog" max-width="1000px">
      <div class="pa-5" style="background-color:#FFFFFF">
        <Form :form="previewSchema" />
      </div>
    </v-dialog>
  </div>
</template>

<script>
import { Component, Vue } from "vue-property-decorator";
import { FormBuilder,Form } from "vue-formio";
import * as db from '../db/indexedDB'
import * as Token from '../API/Token'
import * as APIForm from '../API/ApiForm'
export default {
  name: 'formBuilder',
  props:{
  },
  computed:{
    cardHeight: function(){
      console.log("cardHeight",window.innerHeight)
      return window.innerHeight - 170
    }
  },
  beforeMount()
  {
    this.loadForm(this.$data.formId)
  },
  mounted()
  {
    console.log("*** mounted")
  },
  data () {
    return{
      display:'',
      formId: this.$route.params.formId,
      formTitle:"",
      formComponent: {  display: 'form', components: [] },
      previewSchema: {  display: 'form', components: [] },
      title:"",
      justify: 'end',
      alignment: 'center',
      previewDialog: false,
      builder:"",
    }
  },
  methods:{
    loadForm(id){
      Token.getToken().then(token => {
          APIForm.getForm(id).then(obj => {
            let form  = {display:'form', components:obj['Components']}
            this.builder = window.Formio.builder(this.$refs.formBuilder,form,{}).then(builder => {
              this.$data.previewSchema = form
              this.$data.formTitle = obj.Name
              builder.on('change', () => {
                  this.formOnChange(builder.schema)
              });
            })
          })
        })
    },
    formOnChange(schema){
      console.log("schema", schema)
      this.$data.previewSchema = schema
    },
    showDialog(name){
    switch (name){
      case "preview":
      this.$data.previewDialog = true
      break
    }
  },
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
    },
  },
  components:{
    FormBuilder,
    Form
  }
}

</script>

<style>
.scroll {
  overflow-y: auto;
}
</style>