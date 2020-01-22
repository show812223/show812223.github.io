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
      sort-by="CreatedDate.$date"
      sort-desc
      v-on:click:row="tableClickRow"
    >
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-spacer></v-spacer>

          <v-btn @click="showDialog('createDialog')" color="primary"
            >{{$t("form.add")}}</v-btn
          >
          <!-- create dialog -->
        </v-toolbar>
      </template>
      <template v-slot:item.AppliedVersion.id="{ item }">
        <v-chip outlined color="info" dark>{{
          currentVersionIndex(item)
        }}</v-chip>
      </template>
      <template v-slot:item.CreatedDate.$date="{ item }">
        {{ dateConvert(item.CreatedDate.$date) }}
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
            sort-by="index"
            sort-desc
            :items="addFormIdToVersions(item)"
          >
            <template v-slot:item.index="{ item }">
              <v-chip outlined color="info" dark>
                {{ item.index + 1 }}
              </v-chip>
            </template>
            <template v-slot:item.action="{ item }">
              <v-btn color="info" class="mr-1" outlined>{{$t('actions.apply')}}</v-btn>
              <v-btn
                color="info"
                class="mr-1"
                outlined
                @click="openFormBuilder(item)"
                >{{$t('actions.edit')}}</v-btn
              >
              <v-btn
                color="info"
                class="mr-1"
                outlined
                @click="previewForm(item)"
                >{{$t('actions.preview')}}</v-btn
              >
            </template>
          </v-data-table>
        </td>
      </template>
    </v-data-table>

    <v-dialog v-model="createDialog" max-width="500px">
      <v-card height="100%">
        <v-card-title>
          <span>{{$t('form.add')}}</span>
        </v-card-title>
        <v-card-text>
          <v-form ref="createNewFormForm" lazy-validation>
            <v-text-field
              :rules="textRules"
              v-model="newFormName"
              required
              :label="$t('form.formName')"
            ></v-text-field>
            <v-text-field
              v-model="newFormMemo"
              required
              :label="$t('form.memo')"
            ></v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn outlined @click="closeDialog('createDialog')">{{$t('actions.cancel')}}</v-btn>
          <v-btn color="success" dark @click="createForm()">{{$t('actions.add')}}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>


    <v-lazy>
      <v-dialog v-model="previewDialog">
        <FormRender v-model="previewFormData" />
      </v-dialog>
    </v-lazy>

    <v-dialog v-model="createVersionDialog" max-width="500">
      <v-card class="pa-5">
        <v-card-title>{{$t("form.addNewVersion")}}： {{ createVersionData.Name }}</v-card-title>
        <v-card-text>
          <v-form ref="newVersionForm" lazy-validation>
            <v-text-field
              :rules="textRules"
              v-model="createVersionName"
              required
              :label="$t('form.versionName')"
            ></v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn outlined @click="createVersionDialog = false">{{$t('actions.cancel')}}</v-btn>
          <v-btn color="success" dark @click="addVersion()">{{$t('actions.add')}}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="editFormNameDialog" max-width="300">
      <v-card>
        <v-card-title>{{$t('form.updateFormName')}}</v-card-title>
        <v-card-text>
          <v-form ref="editNameForm" lazy-validation>
            <v-text-field readonly :label="$t('form.formName')" :value="editFormName" />
            <v-text-field
              outlined
              ref="editFormNewName"
              :label="$t('form.newName')"
              v-model="newFormName"
              :rules="textRules"
            ></v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn outlined @click="editFormNameDialog = false">{{$t('actions.cancel')}}</v-btn>
          <v-btn color="success" @click="updateFormName()"
            >{{ $t("actions.update") }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="deleteDialog" max-width="330">
      <v-card class="pa-5">
        <v-card-title>{{$t('form.willDelete')}}</v-card-title>
        <v-card-text>{{$t('form.sureToDelete')}}"{{ deleteText }}"</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn outlined @click="deleteDialog = false">{{$t('actions.cancel')}}</v-btn>
          <v-btn color="delete" dark @click="deleteForm()">{{$t('actions.delete')}}</v-btn>
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
    }
  },
  computed: {
    cardHeight: function() {
      console.log("cardHeight", window.innerHeight);
      return window.innerHeight - 170;
    }
  },
  data() {
    return {
      formComponent: {},
      dialog: false,
      previewDialog: false,
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
      textRules: [value => !!value || this.$i18n.t("form.required")],
      previewFormData: 
      {
        formId: "123456",
        versionId: "456789",
        templeteId: "",
        resultId: ""
      }
    };
  },
  components: {
    formio: Form,
    FormRender
  },
  computed:{
    headers(){
      return [
        { text: "", value: "data-table-expand" },
        { text: this.$i18n.t('dataGrid.name'), align: "left", value: "Name" },
        { text: this.$i18n.t('dataGrid.activeVersion'), value: "AppliedVersion.id", name: "version" },
        { text: this.$i18n.t('dataGrid.createdTime'), value: "CreatedDate.$date" },
        { text: this.$i18n.t('dataGrid.createdUser'), value: "CreatedUserName" },
        { text: this.$i18n.t('dataGrid.memo'), value: "memo" },
        { text: "", align: "center", value: "action", sortable: false }
      ]
    },
    expandedHeader(){
      return [
        { text: this.$i18n.t('dataGrid.versionName'), align: "center", value: "Name"},
        { text: this.$i18n.t('dataGrid.version'), align: "center", value: "index" },
        { text: this.$i18n.t('dataGrid.createdTime'), value: "CreatedTime" },
        { text: this.$i18n.t('dataGrid.createdUser'), value: "CreatedUserName" },
        { text: "", align: "right", value: "action", sortable: false }
      ]
    }
  },
  methods: {
    currentVersionIndex: function(item) {
      let id = item.AppliedVersion.id;
      let versions = item.Versions;
      let t = versions.find(x => x.id === id);
      let index = versions.indexOf(t);
      return index + 1;
    },
    addFormIdToVersions(item) {
      item.Versions.map((version, index) => {
        version["formId"] = item.id;
        version["index"] = index
      });
      return item.Versions;
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
      let timestemp = item;
      var datetime = new Date();
      datetime.setTime(timestemp);
      var year = datetime.getFullYear();
      var month = datetime.getMonth() + 1;
      var date = datetime.getDate();
      var hour = datetime.getHours();
      var minute = datetime.getMinutes();
      var second = datetime.getSeconds();
      var mseconds = datetime.getMilliseconds();
      return year + "-" + month + "-" + date + " " + hour + ":" + minute;
      console.log("date", timestemp);
    },
    updateFormName() {
      if (!this.$refs.editNameForm.validate()) {
        return;
      }
      var newName = JSON.stringify(this.$data.newFormName);
      var formId = this.$data.editFormId;
      console.log("newName", newName);
      this.API.form
        .updateName(formId, newName)
        .then(res => {
          this.showSnackbar(this.$i18n.t("alert.updateFormName"), "success");
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
        case "previewDialog":
          this.$data.previewDialog = true;
          break;
        case "createVersionDialog":
          this.$data.createVersionDialog = true;
          break;
      }
    },
    previewForm(item) {
      console.log(item)
      let id = item.id;
      let data = {
        formId: item.formId,
        versionId: item.id,
        templeteId: "",
        resultId: ""
      };
      this.$data.previewFormData = data;
      this.$data.previewDialog = true;

    },
    closeDialog(name) {
      switch (name) {
        case "createDialog":
          this.$data.createDialog = false;
          break;
        case "previewDialog":
          this.$data.previewDialog = false;
          break;
        case "createVersionDialog":
          this.$data.createVersionDialog = false;
          break;
      }
    },
    createForm() {
      if (!this.$refs.createNewFormForm.validate()) {
        return;
      }
      var name = this.$data.newFormName;
      this.API.form
        .add(name)
        .then(res => {
          this.showSnackbar(this.$i18n.t("alert.addNewForm"), "success");
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
    deleteForm() {
      let item = this.$data.deleteItem;
      let id = item.id;
      let name = item.name;
      this.API.form
        .delete(id)
        .then(res => {
          let message = this.$i18n.t("alert.deleteForm", {
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
    openFormBuilder(item) {
      var formId = item.formId;
      var versionId = item.id;
      this.$router.push({
        name: "formBuilder",
        params: { formId: formId, versionId: versionId }
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
      var data = JSON.stringify({ name: name });
      console.log(id, name);
      this.API.formFormVersion
        .post(id, JSON.stringify(data))
        .then(res => {
          this.$data.createVersionDialog = false;
          this.loadData();
        })
        .catch(error => {
          console.log(error);
        });
    },
    editItem(item) {
      console.log(item);
      this.$data.editFormName = item.Name;
      this.$data.editFormId = item.id;
      this.$data.newFormName = "";
      this.$data.editFormNameDialog = true;
    },
    preview() {
      this.previewDialog = true;
    },
    loadData() {
      this.API.form.get().then(res => {
        console.log("axios form", res.data);
        this.desserts = res.data;
      });
    }
  },
  beforeMount() {
    this.loadData();
  }
};
</script>

<style lang="scss"></style>
