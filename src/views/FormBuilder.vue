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
        <v-toolbar-title>{{ formTitle }}</v-toolbar-title>
        <v-spacer />
        <v-toolbar-items>
          <v-btn icon>
            <v-icon>mdi-refresh</v-icon>
          </v-btn>
          <v-btn icon @click="showDialog('preview')">
            <v-icon>mdi-eye</v-icon>
          </v-btn>
          <v-btn dark color="primary" @click="updateVersionSchema()">
            <v-icon>mdi-content-save</v-icon>
          </v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <div class="pa-5">
        <div ref="formBuilder">
          <v-progress-linear
            indeterminate
            rounded
            height="6"
          ></v-progress-linear>
        </div>
      </div>
    </v-card>

    <v-dialog v-model="previewDialog" max-width="1000px">
      <div class="pa-5" style="background-color:#FFFFFF">
        <Form :form="previewSchema" />
      </div>
    </v-dialog>

    

    <v-dialog v-model="backDialog" max-width="400">
      <v-card>
        <v-card-title>編輯的內容尚未儲存</v-card-title>
        <v-card-text></v-card-text>
        <v-card-actions>
          <v-btn outlined @click="backDialog = false">取消</v-btn>
          <v-spacer />
          <v-btn dark color="error" @click="backPreviousPage()">不儲存</v-btn>
          <v-btn dark color="success" @click="updateVersionSchema()"
            >儲存</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- 儲存中 -->
    <v-dialog v-model="savingDialog" max-width="300">
      <v-card class="text-center">
        <v-card-title>表單儲存中</v-card-title>
        <v-card-text>
          <v-progress-circular size="50" width="5" color="info" indeterminate />
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { Component, Vue } from "vue-property-decorator";
import { FormBuilder, Form } from "vue-formio";
import * as db from "../db/indexedDB";
import EditForm from "../formioSettings/editForm.json";
import API from "../api.js";
export default {
  name: "formBuilder",
  props: {
    API: {
      type: Object,
      default: () => API
    }
  },
  computed: {
    cardHeight: function() {
      return window.innerHeight - 170;
    }
  },
  beforeMount() {
    this.loadForm(this.$data.formId, this.$data.versionId);
  },
  mounted() {
    console.log(this.$data.editForm);
  },
  data() {
    return {
      display: "",
      formId: this.$route.params.formId,
      versionId: this.$route.params.versionId,
      formTitle: "",
      formComponent: { display: "form", components: [] },
      previewSchema: { display: "form", components: [] },
      title: "",
      justify: "end",
      alignment: "center",
      previewDialog: false,
      backDialog: false,
      savingDialog: false,
      builder: "",
      editForm: EditForm
    };
  },
  methods: {
    loadForm(formId, versionId) {
      console.log("form id", formId);
      console.log("version id", versionId);
      this.API.formVersion
        .get(versionId)
        .then(res => {
          console.log("components", res);
          var name = res.Name;
          var components = res["data"]["Format"]["components"];
          this.createFormBuilder(name, components);
        })
        .catch(error => {
          this.createFormBuilder("沒有表單", "");
        });
    },
    createFormBuilder(name, components) {
      var form = { display: "form", components: components };
      this.builder = window.Formio.builder(this.$refs.formBuilder, form, {
        language: this.$i18n.locale,
        i18n: this.$i18n.messages,
        editForm: this.$data.editForm
      }).then(builder => {
        this.$data.previewSchema = form;
        this.$data.formTitle = name;
        builder.on("change", () => {
          this.formOnChange(builder.schema);
        });
      });
    },
    updateVersionSchema() {
      this.$data.savingDialog = true;
      var schema = { components: this.$data.previewSchema.components };
      var formId = this.$data.formId;
      var versionId = this.$data.versionId;
      console.log("schema", schema);
      var data = JSON.stringify(schema);
      this.API.formFormVersion
        .updateSchema(formId, versionId, JSON.stringify(data))
        .then(res => {
          console.log(res);
          setTimeout(this.backPreviousPage(), 10000);
        })
        .catch(error => {
          console.error(error);
        });
    },
    backPreviousPage() {
      this.$router.go(-1);
    },
    formOnChange(schema) {
      this.$data.previewSchema = schema;
    },
    showDialog(name) {
      switch (name) {
        case "preview":
          console.log("*** open preview");
          this.$data.previewDialog = true;
          break;
      }
    },
    modal() {
      this.$modal.show("hello-world");
    }
  },
  components: {
    FormBuilder,
    Form
  }
};
</script>

<style lang="scss">
.sb-form-builder-toolbar {
  position: -webkit-sticky;
  position: sticky;
  top: 0px;
  z-index: 5;
}

// formio css更改
.builder-sidebar_scroll {
  position: -webkit-sticky;
  position: sticky;
  top: 50px;
}

.component-btn-group {
  z-index: 4;
}
</style>
