<template>
  <div>
    <!-- <sb-form-builder></sb-form-builder> -->
    <!-- <sb-created-forms></sb-created-forms> -->
    <!-- <sb-project-form-results></sb-project-form-results> -->
    <!-- <sb-form-render v-model="formdata" :API="yourAPI" /> -->
    <sb-created-flows :flowBuilderRouterName="flowBuilderRouterName" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { API } from "../api.js";
// import syncoboxfrom from "../components/index";
import syncoboxform from 'syncoboxform'
Vue.use(syncoboxform);

export default Vue.extend({
  name: "Home",
  data() {
    return {
      formdata: {
        formId: "04d5b4ec-5202-468d-b861-6135cb678995",
        versionId: "5e336b80-73af-4368-9f03-266c979ccc11",
        templeteId: "",
        resultId: ""
      },
      yourAPI:API,
      flowBuilderRouterName:"testFlowBuilder"
    };
  },
  components: {}
});
</script>

<style lang="scss">
// @import '~syncoboxform/src/styles.scss'
</style>
