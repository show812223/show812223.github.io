<template>
  <div id="createdFoems">
    <!-- table -->
    <v-data-table
      :headers="headers"
      :items="desserts"
      :search="search"
      show-expand
      single-expand
      item-key="id"
      height="720px"
      sort-by="CreatedDate.$date"
      sort-desc
    >
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-toolbar-title>表單</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>

          <v-btn @click="showDialog('createDialog')">新增表單</v-btn>
          <!-- create dialog -->
        </v-toolbar>
      </template>
      <template v-slot:item.AppliedVersion.id="{ item }">
        <v-chip outlined color="blue" dark>{{
          currentVersionIndex(item)
        }}</v-chip>
      </template>
      <template v-slot:item.CreatedDate.$date="{ item }">
        {{ dateConvert(item.CreatedDate.$date) }}
      </template>
      <template v-slot:item.action="{ item }">
        <v-btn class="mr-5" icon color="blue" dark>
          <v-icon @click="setCreateVersionDialog(item)">mdi-plus</v-icon>
        </v-btn>
        <v-btn class="mr-5" icon color="blue" dark>
          <v-icon @click="editItem(item)">mdi-pencil</v-icon>
        </v-btn>
        <v-btn icon color="red">
          <v-icon @click="deleteItem(item)">mdi-delete</v-icon>
        </v-btn>
      </template>
      <!-- expand table -->
      <template v-slot:expanded-item="{ headers, item }">
        <td :colspan="headers.length">
          <v-data-table
            class="ma-5"
            hide-default-footer
            :headers="expandedHeader"
            :items="item.Versions"
          >
            <template v-slot:item.id="{ item }">
              <v-chip outlined color="blue" dark>
                {{ versionIndex(desserts, item) }}
              </v-chip>
            </template>
            <template v-slot:item.action="{ item }">
              <v-btn color="blue" class="mr-1" outlined>應用</v-btn>
              <v-btn
                color="blue"
                class="mr-1"
                outlined
                @click="openFormBuilder(item)"
                >編輯</v-btn
              >
              <v-btn
                color="blue"
                class="mr-1"
                outlined
                @click="previewForm(item)"
                >預覽</v-btn
              >
            </template>
          </v-data-table>
        </td>
      </template>
    </v-data-table>

    <v-dialog v-model="createDialog" max-width="1000px">
      <v-card height="100%">
        <v-card-title>
          <span>新增表單</span>
        </v-card-title>
        <v-card-text>
          <v-text-field
            v-model="newFormName"
            required
            label="表單名稱"
          ></v-text-field>
          <v-text-field
            v-model="newFormMemo"
            required
            label="備註"
          ></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="closeDialog('createDialog')">取消</v-btn>
          <v-btn dark @click="createForm()">新增</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="previewDialog">
      <v-card class="pa-5">
        <formio
          id="formRender"
          :form="formComponent"
          :options="{ noAlerts: true }"
        ></formio>
      </v-card> </v-dialog
    >+

    <v-dialog v-model="createVersionDialog">
      <v-card class="pa-5">
        <v-card-title>
          <span>新增表單版本</span>
        </v-card-title>
        <v-card-text>
          <v-text-field
            v-model="createVersionName"
            required
            label="版本名稱"
          ></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="createVersionDialog = false">取消</v-btn>
          <v-btn dark @click="addVersion()">新增</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-snackbar top :color="snackbarColor" v-model="snackbar" :timeout=5000>
      {{snackbarText}}
  </v-snackbar>

  </div>
</template>

<script>
import { Form } from "vue-formio";
import { API } from "../api.js";
import axios from "axios";
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
    },
    formTitle() {
      return this.$data.editedIndex === -1 ? "新表單" : "編輯表單";
    }
  },
  data() {
    return {
      formComponent: {},
      dialog: false,
      previewDialog: false,
      createDialog: false,
      createVersionDialog: false,
      snackbar:false,
      snackbarText:"",
      snackbarColor:"",
      createVersionData: {},
      createVersionName: "",
      newFormName: "",
      newFormMemo: "",
      search: "",
      headers: [
        { text: "", value: "data-table-expand" },
        { text: "名稱", align: "left", value: "Name" },
        { text: "應用版本", value: "AppliedVersion.id", name: "version" },
        { text: "建立時間", value: "CreatedDate.$date" },
        { text: "建立者", value: "CreatedUserName" },
        { text: "說明", value: "memo" },
        { text: "", align: "center", value: "action", sortable: false }
      ],
      desserts: [],
      expandedHeader: [
        { text: "版次", align: "center", value: "id" },
        { text: "建立時間", value: "CreatedTime" },
        { text: "建立者", value: "CreatedUserName" },
        { text: "", align: "right", value: "action", sortable: false }
      ],
      editedIndex: -1,
      editedItem: {},
      defaultItem: {}
    };
  },
  components: {
    formio: Form
  },
  methods: {
    versionIndex(parent, item) {},
    currentVersionIndex: function(item) {
      let id = item.AppliedVersion.id;
      let versions = item.Versions;
      let t = versions.find(x => x.id === id);
      let index = versions.indexOf(t);
      return index + 1;
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
      this.$data.dialog = true;
      let id = item.id;
      console.log("formId", id);
      this.API.formFormVersion.get(id).then(res => {
        console.log(res);
      });
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
      var name = this.$data.newFormName;
      this.API.form
        .add(name)
        .then(res => {
          this.$data.snackbarText = this.$i18n.t('alert.addNewForm')
          this.$data.snackbarColor = "green lighten-2"
          this.$data.snackbar = true
          this.$data.newFormName = ""
          this.$data.newFormMemo = ""
          this.closeDialog("createDialog");
          this.loadData();
        })
        .catch(error => {
          console.log(error);
        });
    },
    openFormBuilder(item) {
      console.log("open form ", item.formId);
      if (item.formId === "") {
        return;
      }
      this.$router.push({
        name: "formBuilder",
        params: { formId: item.formId }
      });
    },
    setCreateVersionDialog(item) {
      this.$data.createVersionDialog = true;
      this.$data.createVersionData = item;
      this.$data.createVersionName = "";
    },
    addVersion() {
      var item = this.$data.createVersionData;
      var name = this.$data.createVersionName;
      var id = item.id;
      console.log(id, name);
      this.API.formFormVersion.post(id, { name: name }).then(res => {
        console.log(res);
      });
    },
    editItem() {
      this.$data.editedItem = this.$data.defaultItem;
    },
    editVersionItem(item) {
      console.log("editVersionItem", item);
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
    },
    deleteItem(item) {
      const index = this.desserts.indexOf(item);
      confirm("確定要移除表單？") && this.desserts.splice(index, 1);
    },
    close() {
      this.dialog = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },
    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.desserts[this.editedIndex], this.editedItem);
      } else {
        this.desserts.push(this.editedItem);
      }
      this.close();
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
   this.loadData()
  },
  
};
</script>

<style lang="scss"></style>
