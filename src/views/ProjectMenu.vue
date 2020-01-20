<template>
  <v-container fluid>
    <v-layout justify-center align-center row wrap>
      <v-flex xs6 sm4 md3 v-for="d in datas" :key="d.Id">
        <v-card
          class="projectCard"
          max-width="400"
          max-height="300px"
          @click="selectProject(d.Id)"
        >
          <v-img height="200px" :src="'data:image/png;base64,' + d.Image" />
          <v-card-title v-text="d.Name" />
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      datas: []
    };
  },
  beforeMount() {
    apiProject.getProject().then(projects => {
      this.$data.datas = projects;
    });
  },
  methods: {
    selectProject(id) {
      this.$store.dispatch("setProjectId", id);
      let a = this.$store.state.projectId;
      console.log("project id", a);
      this.$router.push({ name: "projectFormResults" });
    }
  }
};
</script>

<style>
.projectCard {
  margin-right: 10px;
  margin-bottom: 10px;
}
</style>
