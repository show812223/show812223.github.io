<template>
  <v-container fluid>
    <v-layout justify-center row>
      <v-flex v-for="d in tasks" :key="d.id">
        <v-card
          class="taskCard m-4"
          width="250px"
          height="200px"
          max-height="500px"
          @click="selectTask(d.id)"
        >
          <v-card-title v-text="d.form.name" />
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import API from "../api.js";
export default {
  props: {
    tasks: Array,
    API: {
      type: Object,
      default: () => API
    }
  },

  methods: {
    selectTask(id) {
      console.log("*** selectTask",id)
      this.$router.replace(
        { name: "taskRender",params: { taskResultId: id } },
      );
    }
  }
};
</script>

<style></style>
