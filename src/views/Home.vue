<template>
  <div>
    <!-- <sb-form-builder></sb-form-builder>
    <sb-created-forms></sb-created-forms>
    <sb-project-form-results></sb-project-form-results> -->
    <!-- <sb-form-render v-model="formdata" /> -->
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import syncoboxfrom from "../components/index";
Vue.use(syncoboxfrom);

export default Vue.extend({
  name: "Home",
  data() {
    return {
      formdata: {
        formId: "825a8c07-9d04-4d57-b1bb-638371cfa214",
        versionId: "428694dc-2b3b-4ede-9039-c2ce2643755b",
        templeteId: "",
        resultId: ""
      }
    };
  },
  components: {}
});
</script>

<style lang="scss">
// @import '~syncoboxform/src/styles.scss'
</style>
