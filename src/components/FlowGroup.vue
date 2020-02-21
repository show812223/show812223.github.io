<template>
  <v-card>
    <v-sheet class="pa-4 primary lighten-2">
      <v-text-field
        v-model="search"
        label="搜尋表單"
        dark
        flat
        solo-inverted
        hide-details
        clearable
        clear-icon="mdi-close-circle-outline"
      ></v-text-field>
    </v-sheet>
    <v-treeview
      :items="items"
      dense
      activatable
      hoverable
      open-on-click
      item-children="children"
      item-text="name"
      item-key="id"
      :search="search"
      :filter="filter"
      @update:active="clickFlowVersion"
    >
      <template v-slot:prepend="{ item, open }">
        <v-icon>
          {{ open ? "mdi-folder-open" : "mdi-folder" }}
        </v-icon>
        <!-- <v-icon  v-else-if="item.hasChildren == false">
          {{"mdi-folder"}}
        </v-icon>
        <v-icon v-else>
          {{"mdi-file-document-outline"}}
        </v-icon> -->
      </template>
    </v-treeview>
  </v-card>
</template>

<script>
import API from "../api.js";
export default {
  data() {
    return {
      search: null,
      items: []
    };
  },
  props: {
    API: {
      type: Object,
      default: () => API
    },
    companyId: {
      type: String,
      default: ""
    }
  },
  beforeMount() {
    this.API.flow
      .get()
      .then(res => {
        console.log("axios form group ", this.companyId, res.data);
        var All = {id : "",name:"All"}
        this.$data.items = res.data;
        this.$data.items.unshift(All)
      })
      .catch(error => {
        console.error("axios form group", this.companyId, error);
      });
  },
  computed: {
    filter() {
      return this.caseSensitive
        ? (item, search, textKey) => item[textKey].indexOf(search) > -1
        : undefined;
    }
  },
  methods: {
    clickFlowVersion(flowId) {
      
      if (flowId.length > 0) {
        // get flow Object
        var flow = this.$data.items.find(x=>x.id === flowId[0])
        this.$emit("clickFlowVersion", flow);
      }else{
        this.$emit("clickFlowVersion", {});
      }
    }
  }
};
</script>

<style></style>
