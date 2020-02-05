<template>
  <div class="pa-5" style="background-color:#FFFFFF">
    <input
      hidden
      v-bind:value="value.versionId"
      v-on:input="$emit('input', $event.target.value)"
    />
    <Form id="formRender" ref="formRender" :form="schema" :language="language"  :options="option"/>
    <v-progress-linear :active="progress" indeterminate color="info" />
  </div>
</template>

<script>
import { FormBuilder, Form } from "vue-formio";
import { API } from "../api.js";
export default {
  name: "formPreview",
  props: {
    value: {
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
    };
  },
  watch: {
    value: function(val) {
      this.loadForm();
    }
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
      console.log("form id", this.$props.value.formId);
      console.log("version id", this.$props.value.versionId);
      
      this.$data.schema = { display: "form", components: [] };
      this.$data.progress = true;
      this.API.formVersion
        .get(this.$props.value.versionId)
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
    test() {
      this.loadForm();
      console.log("preview", this.$data.schema);
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
