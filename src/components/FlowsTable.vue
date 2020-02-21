<template>
  <v-layout wrap>
    <v-btn>{{ flow.id }}</v-btn>

    <v-btn v-if="showCreateBtn" @click="createNewFlowResult">新增</v-btn>
    <v-flex sm12 md12 pa-2>
      <Grid
        :style="{ height: '100%' }"
        :data-items="items"
        :columns="columns"
        @rowclick="clickRow"
      >
      </Grid>
      <v-snackbar top :color="snackbarColor" v-model="snackbar" :timeout="3000">
        {{ snackbarText }}
      </v-snackbar>
    </v-flex>
  </v-layout>
</template>

<script>
import API from "../api.js";
export default {
  data() {
    return {
      columns: [
        { field: "createdDate", title: "建立時間" },
        { field: "createdUserName", title: "建立者" },
        { field: "isCompleted", title: "是否完成" }
      ],
      items: [
        {
          id: "08d7b670-2448-cb56-7450-a855c03180e1",
          flowVersionId: "01390aed-8817-41a1-a983-d56f7f4c68c6",
          isCompleted: false,
          createdUserName: "string",
          createdDate: "2020-02-21T01:48:25.749254",
          modifiedUserName: "00000000-0000-0000-0000-000000000000",
          modifiedDate: "2020-02-21T01:48:25.749254",
          flowName: "施工查核流程",
          flowVersionName: "version 01",
          flowResultStatus: null,
          currentFlowTaskResults: null
        }
      ],
      snackbarColor: "",
      snackbar: false,
      snackbarText: "",
      showCreateBtn: false
    };
  },
  props: {
    API: {
      type: Object,
      default: () => API
    },
    flow: {
      type: Object,
      default: {}
    }
  },
  beforeMount() {
    this.loadData();
  },
  mounted() {},
  watch: {
    flow: function(val) {
      // TODO: reload data
      if (val.id === "") {
        this.$data.showCreateBtn = false;
      } else {
        this.$data.showCreateBtn = true;
      }
    }
  },
  methods: {
    loadData() {},
    tableClickRow() {},
    createNewFlowResult() {
      if (this.$props.flow.id === "" || this.$props.flow.id === undefined) {
        return;
      }
      this.API.flowResult
        .create(this.$props.flow.appliedFlowVersionId)
        .then(result => {
          this.showSnackbar(
            this.$i18n.t("alert.createdNewFlowResult"),
            "success"
          );
        })
        .catch(err => {
          console.error("*** createNewFlowResult", error);
        });
    },
    clickRow(event) {
      // 點選result
      var flowResultId = event.dataItem.id;
      this.API.flowResult
        .get(flowResultId)
        .then(res => {
          console.log("*** clickRow", res.data);
          var currentFlowTaskResults = res.data.currentFlowTaskResults;
          if (currentFlowTaskResults.length === 0) {
            // TODO: 流程進行完成
          } else if (currentFlowTaskResults.length === 1) {
            this.$router.push({
              name: "taskRender",
              params: { taskResultId: currentFlowTaskResults[0].id }
            });
          } else {
          }
        })
        .catch(err => {
          console.error("*** get flowResult", err);
        });
    },
    showSnackbar(text, color) {
      this.$data.snackbarText = text;
      this.$data.snackbarColor = color;
      this.$data.snackbar = true;
    }
  }
};
</script>

<style></style>
