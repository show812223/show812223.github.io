<template>
<div>
  <sb-form-builder></sb-form-builder>
  <sb-created-forms></sb-created-forms>
  <sb-project-form-results></sb-project-form-results>
</div>
</template>

<script lang="ts">
import Vue from 'vue';
import syncoboxfrom from '../components/index'
Vue.use(syncoboxfrom)

export default Vue.extend({
  name: 'Home',

  components: {
  },
});
</script>

<style lang="scss">
  // @import '~syncoboxform/src/styles.scss'
</style>

