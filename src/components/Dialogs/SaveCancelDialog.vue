<template>
  <v-dialog v-model="dialog" max-width="1000px">
    <template v-slot:activator="{ on }">
       <v-btn :outlined="outline" :color="color" dark v-on="on" @click="$emit('click')">{{btnText}}</v-btn>
    </template>
    <v-card>
      <v-card-title>
        <span>{{title}}</span>
      </v-card-title>
      <v-card-text>
        <slot name="body" />
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn rounded @click="close">{{cancelText}}</v-btn>
        <v-btn color="blue" dark rounded @click="$emit('save')">{{saveText}}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props:{
    btnText:{default: "", type:String},
    cancelText:{default: "cancel", type:String},
    saveText:{default: "save", type:String},
    color:{default: "blue", type:String},
    outline:{default: false, type:Boolean},
    title:{default: "", type:String},
  },
data(){
  return{
    dialog:false
  }
},
methods:{
  close(){
    this.$data.dialog = false
  }
}
}
</script>

<style>
</style>