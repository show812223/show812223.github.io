<template> 
   <v-layout wrap >
     <v-flex sm12 md3 pa-2> 
      <FlowGroup />
    </v-flex>
    <v-flex sm12 md9 pa-2> 
      <FlowsTable />
    </v-flex>
  </v-layout>
</template>

<script>
import FlowsTable from "../components/FlowsTable.vue";
import FlowGroup from "../components/FlowGroup.vue";
export default {
	components: {
    FlowsTable,
    FlowGroup
  }
};
</script>

<style></style>
