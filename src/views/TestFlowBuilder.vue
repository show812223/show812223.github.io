<template>
  <v-btn>{{versionId}}</v-btn>
</template>

<script>
export default {
     data() {
    return {
      versionId: this.$route.params.versionId,
    };
  },
}
</script>

<style>

</style>