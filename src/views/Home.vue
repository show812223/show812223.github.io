<template>
<div>
  <!-- <sb-form-formBuilder></sb-form-formBuilder> -->
  <!-- <sb-form-createdForms></sb-form-createdForms> -->
  <sb-form-projectFormGroups></sb-form-projectFormGroups>
</div>
</template>

<script lang="ts">
import Vue from 'vue';
import HelloWorld from '../components/HelloWorld.vue';

export default Vue.extend({
  name: 'Home',

  components: {
    HelloWorld,
  },
});
</script>
