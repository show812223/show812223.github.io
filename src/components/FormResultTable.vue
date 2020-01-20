<template>
  <v-card >
      <v-data-table 
    :headers="headers"
    :items="items"
    @click:row="rowClick"
    >
    <template v-slot:item.CreateTime="{ item }">
           <span>{{new Date(item.CreateTime.$date).toLocaleString()}}</span>
         </template>
    </v-data-table>
    </v-card>
</template>

<script>
export default {
  data () {
    return {
      headers:[
        { text: '表單名稱', align: 'left', sortable: true, value: 'Title' },
        { text: '類型', align: 'left', sortable: false, value: 'TemplateName' },
        { text: '建立時間', align: 'left', sortable: true, value: 'CreateTime' },
        { text: '流程', align: 'left', sortable: false, value: 'Status' },
      ],
      items:[]
    }
  },
  beforeMount(){
      apiForm.getFormResult("5dfd0427-408c-48e7-a15e-aff7ab07b4d7").then(res => {
        console.log("getFormResult", res)
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