<template>
  <v-layout wrap>
        <v-flex sm12 md2 pa-2>
          <FormGroup />
        </v-flex>
        <v-flex sm12 md10 pa-2> 
          <FormResultTable />
        </v-flex>
      </v-layout>
</template>

<script>
import FormGroup from '../components/FormGroup'
import FormResultTable from '../components/FormResultTable'
export default {
  components:{
    FormGroup,
    FormResultTable
  }
}
</script>

<style>
</style>