<template>
  <v-list dense>
        <v-list-item
          v-for="page in pages"
          :key="page.title"
          @click="changeRouter(page.router)"
        >
          <v-list-item-action>
            <v-icon>{{page.icon}}</v-icon>
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
        { icon: '', title: '專案選擇', router:'/ProjectMenu'},
        { icon: '', title: '表單製作器', router:'/FormBuilder'},
        { icon: '', title: '表單列表', router:'/CreatedForms'},
        { icon: '', title: '表單填寫結果列表', router:'/ProjectFormResults'},
        { icon: '', title: '流程一覽表(Flow)', router: '/CreatedFlows'},
        { icon: '', title: 'project flows', router: '/ProjectFlows'}
      ]
    }
  }
}

</script>
