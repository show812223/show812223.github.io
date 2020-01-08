<template>
  <div>
    <v-card width="100%">
      <v-toolbar
        dense
        class="sb-form-builder-toolbar mb-5"
        flat
        :color="'grey lighten-3'"
      >
        <v-toolbar-title>{{ formTitle }}</v-toolbar-title>
        <v-spacer />
        <v-toolbar-items>
          <v-btn icon>
            <v-icon>mdi-arrow-left</v-icon>
          </v-btn>
          <v-btn icon>
            <v-icon>mdi-arrow-right</v-icon>
          </v-btn>
          <v-btn icon>
            <v-icon>mdi-refresh</v-icon>
          </v-btn>
          <v-btn icon @click="showDialog('preview')">
            <v-icon>mdi-eye</v-icon>
          </v-btn>
          <v-btn rounded small dark color="blue lighten-1" @click="saveForm">
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
  </div>
</template>

<script>
import { Component, Vue } from "vue-property-decorator";
import { FormBuilder, Form } from "vue-formio";
import * as db from "../db/indexedDB";
import * as Token from "../API/Token";
import * as APIForm from "../API/ApiForm";
export default {
  name: "formBuilder",
  props: {},
  computed: {
    cardHeight: function() {
      console.log("cardHeight", window.innerHeight);
      return window.innerHeight - 170;
    }
  },
  beforeMount() {
    this.loadForm(this.$data.formId);
  },
  mounted() {
    console.log("*** mounted");
  },
  data() {
    return {
      display: "",
      formId: this.$route.params.formId,
      formTitle: "",
      formComponent: { display: "form", components: [] },
      previewSchema: { display: "form", components: [] },
      title: "",
      justify: "end",
      alignment: "center",
      previewDialog: false,
      builder: ""
    };
  },
  methods: {
    loadForm(id) {
      Token.getToken().then(token => {
        APIForm.getForm(id).then(obj => {
          let form = { display: "form", components: obj["Components"] };
          this.builder = window.Formio.builder(this.$refs.formBuilder, form, {
            language: "zhhant",
            i18n: {
              en: {
                Submit: "Complete"
              },
              zhhant: {
                Submit: "送出",
                "Please correct all errors before submitting.":
                  "Por favor, corrija todos los errores antes de enviar.",
                "My custom error message": "Mi mensaje de error personalizado",
                required: "{{field}} es requerido.",
                invalid_email:
                  "{{field}} debe ser un correo electrónico válido.",
                error:
                  "Por favor, corrija los siguientes errores antes de enviar."
              }
            }
          }).then(builder => {
            this.$data.previewSchema = form;
            this.$data.formTitle = obj.Name;
            builder.on("change", () => {
              this.formOnChange(builder.schema);
            });
          });
        });
      });
    },
    formOnChange(schema) {
      console.log("schema", schema);
      this.$data.previewSchema = schema;
    },
    showDialog(name) {
      switch (name) {
        case "preview":
          this.$data.previewDialog = true;

          break;
      }
    },
    saveForm() {
      let obj = {
        id: "ed8286ed-6a2a-4f1d-a219-e23b47463dc8",
        name: "HanHanSoCool",
        title: this.$data.title,
        form: this.$data.form
      };
      db.writeData(db.SYNC_FormSchema, obj).then(() => {
        navigator.serviceWorker.ready.then(sw => {
          sw.sync.register("sync-formSchema");
          // APIForm.postFormResult(result)
        });
      });
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
