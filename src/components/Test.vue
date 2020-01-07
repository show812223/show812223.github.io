<template>
   <v-btn small color="primary" @click="btnClick">Primary</v-btn>
</template>

<script>


export default {
  name: 'Test',
  data () {
    return {
      btnText: 'sync rigister'
    }
  },
  methods: {
    btnClick(){
      test()
    }
  }
  
}

function test(){
  var data = {
    id:123,
    data:123456789
  }
  writeData(SYNC_POST,data)
}

</script>

<style>

</style>