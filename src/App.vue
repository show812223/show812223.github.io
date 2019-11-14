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
      <v-container>
        <router-view />
      </v-container>
    </v-content>
    <v-footer app>
      <span>&copy; 2019</span>
    </v-footer>
  </v-app>
</template>

<script>
import SideBarMeun from './components/SideBarMenu'

export default {
  name: 'App',
  props: {
    source: String
  },
  components: {
    SideBarMeun
  },

  data: () => ({
    drawer: null
  })
}
</script>
