<template>
  <div>
    <Syncoboxflow :API="API" :iframeSrc="iframeSrc" :companyId="companyId" />
  </div>
</template>

<script>
import API from "../api.js";
export default {
  props: {
    API: {
      type: Object,
      default: () => API
    }
  },
  data() {
    return {
      versionId: this.$route.params.flowVersion,
      iframeSrc: "/kendoUIFilter/index.html",
      companyId: "54f90bfb-ae35-4529-90cf-fb486251cdaf"
    };
  }
};
</script>