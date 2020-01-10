<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" app>
      <SideBarMeun />
    </v-navigation-drawer>

    <v-app-bar app dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>WeFrom</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-select v-model="$root.$i18n.locale" :items="langs" item-value="value" item-text="key"/>
      
    </v-app-bar>

    <v-content>
      <router-view />
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
    drawer: null,
    langs: [{key:"繁體中文", value:"zh-TW"},{key:"English",value:"en"}],
  })
});
</script>
