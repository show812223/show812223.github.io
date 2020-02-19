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
      companyId: "ff526057-1998-43a7-9847-4623712eb980"
    };
  }
};
</script>
<style>
</style>