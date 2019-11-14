<template>
  <v-list dense>
        <v-list-item
          v-for="page in pages"
          :key="page.title"
          @click="changeRouter(page.router)"
        >
          <v-list-item-action>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="page.title"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
</template>

<script>
export default {
  name: 'SideBarMenu',
  props: {
    msg: String
  },
  methods: {
    changeRouter (router) {
      this.$router.push(router)
    }
  },
  data () {
    return {
      pages: [
        { icon: '', title: 'Home', router: '/' },
        { icon: '', title: 'About', router: '/about' },
        { icon: '', title: '表單', router: '/Forms' }
      ]
    }
  }
}

</script>
