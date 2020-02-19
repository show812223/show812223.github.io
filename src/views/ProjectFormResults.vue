<template>
  <v-layout wrap >
    <v-flex sm12 md3 pa-2>
      <FormGroup v-bind:companyId="companyId" />
    </v-flex>
    
    <v-flex sm12 md9 pa-2> 
      <FormResultTable />
    </v-flex>
  </v-layout>
</template>

<script>
import FormGroup from '../components/FormGroup'
import FormResultTable from '../components/FormResultTable'
import API from '../api.js'
export default {
  props:{
    API:{
      type:Object,
      default:()=>API
    },
    companyId:{
      type:String,
      default:"ccc80d4b-9775-4c71-b82a-711e0a595917"
    }
  },
  components:{
    FormGroup,
    FormResultTable
  }
}
</script>

<style>
</style>