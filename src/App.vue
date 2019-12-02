<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" app>
      <SideBarMeun />
    </v-navigation-drawer>

    <v-app-bar app dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>WeFrom</v-toolbar-title>
    </v-app-bar>

    <v-content>
      <v-container fluid>
        <router-view />
      </v-container>
    </v-content>
    <v-footer app>
      <span>&copy; 2019</span>
    </v-footer>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import SideBarMeun from '../src/components/SideBarMenu.vue'

export default Vue.extend({
  name: "App",
  props: {
    source: String
  },
  components: {
    SideBarMeun
  },
  mounted() {
    document.addEventListener("SWEvent", this.swEvent);
  },
  methods: {
    swEvent() {
      console.log("SWEvent calllllllll");
    }
  },
  data: () => ({
    drawer: null
  })
});
</script>
