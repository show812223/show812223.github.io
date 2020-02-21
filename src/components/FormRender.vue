<template>
  <div class="pa-5" style="background-color:#FFFFFF">
    <input
      hidden
      v-bind:value="value.versionId"
      v-on:input="$emit('input', $event.target.value)"
    />
    <Form
      id="formRender"
      ref="formRender"
      :form="schema"
      :language="language"
      :options="option"
    />
    <v-progress-linear :active="progress" indeterminate color="info" />
  </div>
</template>

<script>
import { FormBuilder, Form } from "vue-formio";
import API from "../api.js";
export default {
  name: "formPreview",
  props: {
    formValues: {
      formId: String,
      versionId: String,
      template: String,
      resultId: String
    },
    readOnly:{
      type: Boolean,
      default: false
    },
    API: {
      type: Object,
      default: () => API
    }
  },
  data() {
    return {
      schema: { display: "form", components: [] },
      progress: true,
      value:this.$props.formValues
    };
  },
  components: {
    Form
  },
  computed:{
    option(){
      return {i18n: this.$i18n.messages, readOnly: this.$props.readOnly}
    },
    language(){
      return this.$i18n.locale
    }
  },
  methods: {
    loadForm() {
      console.log("****** form perview");
      console.log("form id", this.$data.value.formId);
      console.log("version id", this.$data.value.versionId);

      this.$data.schema = { display: "form", components: [] };
      this.$data.progress = true;
      this.API.formVersion
        .get(this.$data.value.versionId)
        .then(res => {
          var data = res["data"];
          var name = res.Name;
          var components = data["Format"]["components"];
          this.$data.schema = { display: "form", components: components };
          console.log("preview", this.$data.schema);
          let form = this.$refs.formRender
      console.log("i18n",form)
        })
        .catch(error => {
          console.log(error);
          
        })
        .finally(() => {
          this.$data.progress = false;
        });
    },
    getSubmiton(){ // 取得formio的 資料
      console.log("*** getSubmiton")
      var formData = this.$refs.formRender.formio.data
      // 回傳給TaskRenderView
      this.$emit("poatTaskResult",formData)
    },
    getValue(value){
      console.log("*** getValue",value)
      this.$data.value = value
      this.loadForm()
    }
  },
  beforeMount() {
    this.loadForm();
  }
};
</script>

<style>
.is-hidden {
  display: none !important;
}
</style>
