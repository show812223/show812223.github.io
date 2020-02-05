<template>
  <div id="createdFoems">
    <!-- table -->
    <v-data-table
      ref="dataTable_form"
      :headers="headers"
      :items="desserts"
      :search="search"
      show-expand
      single-expand
      item-key="id"
      height="720px"
      sort-by="createdDate"
      sort-desc
      v-on:click:row="tableClickRow"
    >
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-toolbar-title>
            {{ $t("flow.title") }}
          </v-toolbar-title>
          <v-spacer></v-spacer>

          <v-btn @click="showDialog('createDialog')" color="primary">{{
            $t("flow.add")
          }}</v-btn>
          <!-- create dialog -->
        </v-toolbar>
      </template>
      <template v-slot:item.appliedFlowVersionId="{ item }">
        <v-chip outlined color="info" dark>{{
          currentVersionIndex(item)
        }}</v-chip>
      </template>
      <template v-slot:item.createdDate="{ item }">
        {{ dateConvert(item.createdDate) }}
      </template>
      <template v-slot:item.action="{ item }">
        <v-btn class="mr-5" icon color="info" dark>
          <v-icon @click="setCreateVersionDialog(item)">mdi-plus</v-icon>
        </v-btn>
        <v-btn class="mr-5" icon color="info" dark>
          <v-icon @click="editItem(item)">mdi-pencil</v-icon>
        </v-btn>
        <v-btn icon color="delete">
          <v-icon @click="openDeleteDialog(item)">mdi-delete</v-icon>
        </v-btn>
      </template>

      <!-- expand table -->
      <template v-slot:expanded-item="{ headers, item }">
        <td :colspan="headers.length">
          <v-data-table
            class="ma-5"
            hide-default-footer
            :headers="expandedHeader"
            sort-by="createdDate"
            sort-desc
            :items="addFormIdToVersions(item)"
          >
            <template v-slot:item.index="{ item }">
              <v-chip outlined color="info" dark>
                {{ item.index + 1 }}
              </v-chip>
            </template>
            <template v-slot:item.createdDate="{ item }">
              {{ dateConvert(item.createdDate) }}
            </template>
            <template v-slot:item.action="{ item }">
              <v-btn
                color="info"
                class="mr-1"
                outlined
                @click="setAppliedVersion(item)"
                >{{ $t("actions.apply") }}</v-btn
              >
              <v-btn
                color="info"
                class="mr-1"
                outlined
                @click="openFlowBuilder(item)"
                >{{ $t("actions.edit") }}</v-btn
              >
            </template>
          </v-data-table>
        </td>
      </template>
    </v-data-table>

    <v-dialog v-model="createDialog" max-width="500px">
      <v-card height="100%">
        <v-card-title>
          <span>{{ $t("flow.add") }}</span>
        </v-card-title>
        <v-card-text>
          <v-form ref="createNewFormForm" lazy-validation>
            <v-text-field
              :rules="textRules"
              v-model="newFormName"
              required
              :label="$t('flow.flowName')"
            ></v-text-field>
            <v-text-field
              v-model="newFormMemo"
              required
              :label="$t('flow.memo')"
            ></v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn outlined @click="closeDialog('createDialog')">{{
            $t("actions.cancel")
          }}</v-btn>
          <v-btn color="success" dark @click="createFlow()">{{
            $t("actions.add")
          }}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="createVersionDialog" max-width="500">
      <v-card class="pa-5">
        <v-card-title
          >{{ $t("flow.addNewVersion") }}：
          {{ createVersionData.Name }}</v-card-title
        >
        <v-card-text>
          <v-form ref="newVersionForm" lazy-validation>
            <v-text-field
              :rules="textRules"
              v-model="createVersionName"
              required
              :label="$t('flow.versionName')"
            ></v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn outlined @click="createVersionDialog = false">{{
            $t("actions.cancel")
          }}</v-btn>
          <v-btn color="success" dark @click="addVersion()">{{
            $t("actions.add")
          }}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="editFormNameDialog" max-width="300">
      <v-card>
        <v-card-title>{{ $t("flow.updateFormName") }}</v-card-title>
        <v-card-text>
          <v-form ref="editNameForm" lazy-validation>
            <v-text-field
              readonly
              :label="$t('flow.flowName')"
              :value="editFormName"
            />
            <v-text-field
              outlined
              ref="editFormNewName"
              :label="$t('flow.newName')"
              v-model="newFormName"
              :rules="textRules"
            ></v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn outlined @click="editFormNameDialog = false">{{
            $t("actions.cancel")
          }}</v-btn>
          <v-btn color="success" @click="updateName()"
            >{{ $t("actions.update") }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="deleteDialog" max-width="330">
      <v-card class="pa-5">
        <v-card-title>{{ $t("flow.willDelete") }}</v-card-title>
        <v-card-text
          >{{ $t("flow.sureToDelete") }}"{{ deleteText }}"</v-card-text
        >
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn outlined @click="deleteDialog = false">{{
            $t("actions.cancel")
          }}</v-btn>
          <v-btn color="delete" dark @click="deleteFlow()">{{
            $t("actions.delete")
          }}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-snackbar top :color="snackbarColor" v-model="snackbar" :timeout="5000">
      {{ snackbarText }}
    </v-snackbar>
  </div>
</template>

<script>
import { Form } from "vue-formio";
import { API } from "../api.js";
import axios from "axios";
import FormRender from "../components/FormRender";
export default {
  props: {
    API: {
      type: Object,
      default: () => API
    },
    flowBuilderRouterName: ""
  },
  computed: {
    cardHeight: function() {
      return window.innerHeight - 170;
    }
  },
  data() {
    return {
      formComponent: {},
      dialog: false,
      createDialog: false,
      createVersionDialog: false,
      deleteDialog: false,
      editFormNameDialog: false,
      deleteText: "",
      deleteItem: {},
      snackbar: false,
      snackbarText: "",
      snackbarColor: "",
      createVersionData: {},
      createVersionName: "",
      newFormName: "",
      newFormMemo: "",
      editFormId: "",
      editFormName: "",
      search: "",
      desserts: [],
      textRules: [value => !!value || this.$i18n.t("flow.required")]
    };
  },
  components: {
    formio: Form,
    FormRender
  },
  computed: {
    headers() {
      return [
        { text: "", value: "data-table-expand" },
        { text: this.$i18n.t("dataGrid.name"), align: "left", value: "name" },
        {
          text: this.$i18n.t("dataGrid.activeVersion"),
          value: "appliedFlowVersionId",
          name: "version"
        },
        {
          text: this.$i18n.t("dataGrid.createdTime"),
          value: "createdDate"
        },
        {
          text: this.$i18n.t("dataGrid.createdUser"),
          value: "createdUserName"
        },
        { text: this.$i18n.t("dataGrid.memo"), value: "memo" },
        { text: "", align: "center", value: "action", sortable: false }
      ];
    },
    expandedHeader() {
      return [
        {
          text: this.$i18n.t("dataGrid.versionName"),
          align: "center",
          value: "name"
        },
        {
          text: this.$i18n.t("dataGrid.version"),
          align: "center",
          value: "index"
        },
        { text: this.$i18n.t("dataGrid.createdTime"), value: "createdDate" },
        {
          text: this.$i18n.t("dataGrid.createdUser"),
          value: "createdUserName"
        },
        { text: "", align: "right", value: "action", sortable: false }
      ];
    }
  },
  methods: {
    currentVersionIndex: function(item) {
      let id = item.appliedFlowVersionId;
      let versions = item.flowVersions.slice().sort((a, b) => new Date(a.createdDate) - new Date(b.createdDate));
      let t = versions.find(x => x.id === id);
      let index = versions.indexOf(t);
      console.log("currentVersionIndex",index);
      return index + 1;
    },
    addFormIdToVersions(item) {
      var versions = item.flowVersions;
      var sort = versions
        .slice()
        .sort((a, b) => new Date(a.createdDate) - new Date(b.createdDate));
      sort.map((version, index) => {
        version["index"] = index;
      });
      return sort;
    },
    tableClickRow(item) {
      let table = this.$refs.dataTable_form;
      let current = table.expansion[item.id];
      if (current) {
        table.expansion[item.id] = false;
      }
      table.expansion = {};
      if (current !== true) {
        table.expansion[item.id] = true;
      }
    },
    dateConvert(item) {
      var datetime = new Date(`${item}`).toLocaleDateString();
      return datetime;
    },
    updateName() {
      if (!this.$refs.editNameForm.validate()) {
        return;
      }
      var newName = JSON.stringify(this.$data.newFormName);
      var formId = this.$data.editFormId;
      this.API.flow
        .updateName(formId, newName)
        .then(res => {
          this.showSnackbar(this.$i18n.t("alert.updateFlowName"), "success");
          this.loadData();
          this.editFormNameDialog = false;
        })
        .catch(error => {
          console.error(error);
        });
    },
    showDialog(name) {
      switch (name) {
        case "createDialog":
          this.$data.createDialog = true;
          break;
        case "createVersionDialog":
          this.$data.createVersionDialog = true;
          break;
      }
    },
    closeDialog(name) {
      switch (name) {
        case "createDialog":
          this.$data.createDialog = false;
          break;
        case "createVersionDialog":
          this.$data.createVersionDialog = false;
          break;
      }
    },
    createFlow() {
      if (!this.$refs.createNewFormForm.validate()) {
        return;
      }
      var name = this.$data.newFormName;
      this.API.flow
        .create(name)
        .then(res => {
          this.showSnackbar(this.$i18n.t("alert.addNewFlow"), "success");
          this.$data.newFormName = "";
          this.$data.newFormMemo = "";
          this.closeDialog("createDialog");
          this.loadData();
        })
        .catch(error => {
          console.log(error);
        });
    },
    openDeleteDialog(item) {
      this.$data.deleteDialog = true;
      this.$data.deleteText = item.Name;
      this.$data.deleteItem = item;
    },
    deleteFlow() {
      let item = this.$data.deleteItem;
      let id = item.id;
      let name = item.name;
      this.API.flow
        .delete(id)
        .then(res => {
          let message = this.$i18n.t("alert.deleteFlow", {
            name: name
          });
          this.showSnackbar(message, "success");
          this.loadData();
          this.$data.deleteDialog = false;
        })
        .catch(error => {
          console.error(error);
        });
    },
    showSnackbar(text, color) {
      this.$data.snackbarText = text;
      this.$data.snackbarColor = color;
      this.$data.snackbar = true;
    },
    openFlowBuilder(item) {
      var versionId = item.id;
      this.$router.push({
        name: this.$props.flowBuilderRouterName,
        params: { versionId: versionId }
      });
    },
    setCreateVersionDialog(item) {
      this.$data.createVersionDialog = true;
      this.$data.createVersionData = item;
      this.$data.createVersionName = "";
    },
    addVersion() {
      if (!this.$refs.newVersionForm.validate()) {
        return;
      }
      var item = this.$data.createVersionData;
      var name = this.$data.createVersionName;
      var id = item.id;
      var data = JSON.stringify({ flowId: id, name: name });
      this.API.flowVersion
        .create(data)
        .then(res => {
          this.$data.createVersionDialog = false;
          this.loadData();
        })
        .catch(error => {
          console.log(error);
        });
    },
    setAppliedVersion(item) {
      console.log("setAppliedVersion", item);
      var flowId = item.flowId;
      var versionId = item.id;
      this.API.flow
        .appliedVersion(flowId, versionId)
        .then(res => {
          this.loadData();
        })
        .catch(error => {
          console.log(error);
        });
    },
    editItem(item) {
      this.$data.editFormName = item.name;
      this.$data.editFormId = item.id;
      this.$data.newFormName = "";
      this.$data.editFormNameDialog = true;
    },
    loadData() {
      this.API.flow
        .get()
        .then(res => {
          var data = res.data;
          var d = data.forEach((item, index) => {
            var versions = item.flowVersions;
            console.log("***loadData",versions)
            var sort = versions.slice().sort((a, b) => new Date(a.createdDate) - new Date(b.createdDate));
            sort.map((version, index) => {
              version["index"] = index;
            });
            item.flowVersions = sort
          });

          console.log("***loadData",d)

          this.desserts = res.data;
        })
        .catch(error => {
          console.error("******", error);
          this.desserts = [];
        });
    }
  },
  beforeMount() {
    this.loadData();
  }
};
</script>

<style lang="scss"></style>
