<template>
  <v-card >
      <v-data-table 
    :headers="headers"
    :items="items"
    :items-per-page="All"
    @click:row="rowClick"
    >
    </v-data-table>
    </v-card>
</template>

<script>
import * as apiForm from '../API/ApiForm'
export default {
  data () {
    return {
      headers:[
        { text: '表單名稱', align: 'left', sortable: false, value: 'Title' },
        { text: '類型', align: 'left', sortable: false, value: 'TemplateName' },
        { text: '建立時間', align: 'left', sortable: false, value: 'CreateTime' },
        { text: '流程', align: 'left', sortable: false, value: 'Status' },
      ],
      items:[]
    }
  },
  beforeMount(){
      apiForm.getFormResult("0d86a364-9fb8-4ee6-81df-f103636ca293").then(res => {
        this.$data.items = res
      })
  },
  methods:{
    rowClick(data){
      
    }
  }
}
</script>

<style>

</style>