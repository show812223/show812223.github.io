<template> 
   <v-layout wrap >
     <v-flex sm12 md3 pa-2> 
      <FlowGroup :API="API" @clickFlowVersion="flow = $event"/>
    </v-flex>
    <v-flex sm12 md9 pa-2> 
      <FlowsTable :API="API" :flow="flow"/>
    </v-flex>
  </v-layout>
</template>

<script>
import API from "../api.js";
import FlowsTable from "../components/FlowsTable.vue";
import FlowGroup from "../components/FlowGroup.vue";
export default {
  data(){
    return {
      flow:{}
    }
  },
  props: {
    API: {
      type: Object,
      default: () => API
    }
  },
	components: {
    FlowsTable,
    FlowGroup
  }
};
</script>

<style></style>
