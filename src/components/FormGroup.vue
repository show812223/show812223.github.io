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
      open-on-click
      item-children="Items"
      item-text="Title"
      item-key="Id"
      :search="search"
      :filter="filter"
      @update:active="test"
      activatable
    ></v-treeview>
  </v-card>
</template>

<script>
import * as ApiFormGroup from '../API/ApiFormGroup'
export default {
  data () {
    return {
      search: null,
      items:[]
    }
  },
  beforeMount(){
    ApiFormGroup.getFormGroup().then(res => {
      this.$data.items = res
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