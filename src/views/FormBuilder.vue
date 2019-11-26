<template>
  <div id="builder">
    <v-card>
      <v-container>
        <FormBuilder v-bind:form="form"></FormBuilder>
      </v-container>
    </v-card>
  </div>
</template>

<script>
import { Component, Vue } from "vue-property-decorator";
import { FormBuilder } from "vue-formio";
export default {
  name: 'formBuilder',
  data () {
    return{
      form: {}
    }
  },
  components:{
    FormBuilder
  }
}
</script>

<style>
</style>