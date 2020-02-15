<template>
  <div>
    <v-btn>{{flowVersionId}}</v-btn>
  </div>
</template>

<script>
import { API } from "../api.js";
export default {
  data() {
    return {
      flowVersionId: this.$route.params.flowVersionId
    };
  },
  props: {
    API: {
      type: Object,
      default: () => API
    }
  }
};
</script>

<style></style>
