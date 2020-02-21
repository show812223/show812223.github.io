<template>
  <div>
    <v-card width="100%">
      <v-toolbar
        dense
        class="sb-form-builder-toolbar mb-5"
        flat
        :color="'grey lighten-3'"
      >
        <v-btn icon @click="backDialog = true">
          <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
        <v-divider class="mx-5" vertical inset />
        <v-toolbar-title>{{ this.$data.title }}</v-toolbar-title>
        <v-spacer />
        <v-toolbar-items>
          <v-btn icon>
            <v-icon>mdi-refresh</v-icon>
          </v-btn>
          <v-btn dark color="primary" @click="saveTaskResult()">
            <v-icon>mdi-content-save</v-icon>
          </v-btn>
        </v-toolbar-items>
      </v-toolbar>
    </v-card>
    <div>
      <FormRender
        ref="formRenderView"
        v-if="isForm"
        :formValues="formRenderValue"
        @poatTaskResult="postTaskResult"
      />
    </div>

    <v-dialog persistent v-model="taskSelectorDialog" max-width="600px">
      <div class="pa-5" style="background-color:#FFFFFF">
        <TaskSelector :tasks="taskSelectorData" />
      </div>
    </v-dialog>
  </div>
</template>

<script>
import API from "../api.js";
import FormRender from "../components/FormRender.vue";
import TaskSelector from "../components/TaskSelector.vue";
export default {
  data() {
    return {
      taskResultId: this.$route.params.taskResultId,
      flowResultId: "",
      isForm: false,
      taskSelectorDialog: false,
      title: "",
      formRenderValue: {
        formId: "",
        versionId: "",
        template: "",
        resultId: ""
      },
      taskSelectorData: {}
    };
  },
  props: {
    API: {
      type: Object,
      default: () => API
    }
  },
  components: {
    FormRender,
    TaskSelector
  },
  watch:{
    '$route'(to,from){
      this.$data.taskResultId = to.params.taskResultId
      this.$data.taskSelectorDialog = false
      this.prepareData()
    }
  },
  methods: {
    saveTaskResult() {
      console.log("*** saveTaskResult");
      this.$refs.formRenderView.getSubmiton();
    },
    postTaskResult(data) {
      if (this.$data.isForm) {
        var json = JSON.stringify(data);
        this.API.flowTaskResult
          .postFormResult(this.$data.taskResultId, json)
          .then(res => {
            // 確認是否還有下個步驟
            this.checkNextTask();
          })
          .catch(err => {
            console.error("*** postTaskResult", err);
          });
      }
    },
    checkNextTask() {
      console.log("*** checkNextTask");
      this.API.flowResult
        .get(this.$data.flowResultId)
        .then(res => {
          var currentTasks = res.data.currentFlowTaskResults;
          console.log("*** checkNextTask", currentTasks);
          if (currentTasks.length > 0) {
            this.$data.taskSelectorDialog = true;
            this.$data.taskSelectorData = currentTasks;
          }
        })
        .catch(err => {
          console.error("*** checkNextTask", err);
        });
    },
    prepareData() {
      console.log("*** prepareData", this.$route.params.taskResultId);
      this.API.flowTaskResult
        .get(this.$data.taskResultId)
        .then(res => {
          this.$data.flowResultId = res.data.flowResultId;
          var form = res.data.form;
          this.$data.title = "";
          if (res.data.flowName !== undefined) {
            this.$data.title += res.data.flowName;
          }
          if (form !== undefined) {
            console.log("*** mounted", res.data);

            this.$data.title += " > " + form.name;
            this.$data.isForm = true;
            var value = {
              formId: form.id,
              versionId: form.appliedVersion.id,
              template: form.templates,
              resultId: ""
            };
            this.$data.formRenderValue = value;
            // 傳值改變formrender的value，因為router在動態導向後porps不會改變
            this.$refs.formRenderView.getValue(value)
          }
        })
        .catch(err => {
          console.error("*** mounted", err);
        });
    }
  },
  mounted() {
    this.prepareData();
  }
};
</script>

<style></style>
