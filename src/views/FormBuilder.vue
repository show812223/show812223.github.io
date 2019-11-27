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
            <FormBuilder v-bind:form="form"></FormBuilder>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>

    <modal name="hello-world">
      </modal>
  </div>
</template>

<script>
import { Component, Vue } from "vue-property-decorator";
import { FormBuilder,Form } from "vue-formio";
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
      var formData  = {
        title: this.$data.title,
        form: this.$data.form
      }
      let json = JSON.stringify(formData)
      console.log(json)
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