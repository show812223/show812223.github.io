<template>
  <v-card>
    <v-sheet class="pa-4 primary lighten-2">
      <v-text-field
        v-model="search"
        label="搜尋表單"
        dark
        flat
        solo-inverted
        hide-details
        clearable
        clear-icon="mdi-close-circle-outline"
      ></v-text-field>
    </v-sheet>
    <v-treeview
      :items="items"
      dense
      activatable
      open-on-click
      item-children="children"
      item-text="name"
      item-key="Id"
      :search="search"
      :filter="filter"
    ></v-treeview>
  </v-card>
</template>

<script>
import {API} from '../api.js'
export default {
  data () {
    return {
      search: null,
      items:[]
    }
  },
  props:{
    API:{
      type:Object,
      default:()=>API
    },
    companyId:{
      type:String,
      default:"",
    }
  },
  beforeMount(){
    this.API.companyFormGroup.get(this.companyId)
    .then(res =>{
      console.log("axios form group", res.data)
      this.$data.items = res.data
    }).catch(error =>{
      console.error("axios form group", error)
    })
  },
  computed:{
    filter(){
      return this.caseSensitive
        ? (item, search, textKey) => item[textKey].indexOf(search) > -1
        : undefined
    }
  },
  methods:{
    test() {
      console.log('TEST', this.active)
      },
  }
}
</script>

<style>
</style>