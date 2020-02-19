<template>
  <v-layout wrap>
    <v-flex sm12 md12 pa-2> 
      
    </v-flex>
  </v-layout>
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
  beforeMount(){
    this.loadData()
  },
  methods:{
    loadData(){
      
    }
  }
};
</script>

<style></style>
