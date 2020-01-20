<template>
<v-dialog v-model="show" max-width="1000px">
      <v-card height="100%">
        <v-card-title>
          <span>新增表單</span>
        </v-card-title>
        <v-card-text>
         <v-text-field v-model="name" label="表單名稱" />
      <v-text-field v-model="memo" label="備註" />
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="closeDialog('createDialog')">取消</v-btn>
          <v-btn dark>新增</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

</template>

<script>
export default {
  props: {
    show: Boolean
  },
  data() {
    return {
      name: "",
      memo: ""
    };
  },
  methods: {
    nameError() {
      return "請輸入名稱"
    }
  }
};
</script>
