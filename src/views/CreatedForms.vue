<template>
  <div id="app">
    <v-app id="inspire">
      <!-- table -->
      <v-data-table
        :headers="headers"
        :items="desserts"
        :search="search"
        show-expand
        single-expand
        item-key="name"
        class="elevation-1"
        height="720px"
      >
        <template v-slot:top>
          <v-toolbar flat color="white">
            <v-toolbar-title>表單</v-toolbar-title>
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-spacer></v-spacer>
            <v-text-field
              class="mr-5"
              v-model="search"
              append-icon="search"
              label="Search"
              hide-details
              single-line
              placeholder="搜尋"
            />
            <v-btn @click="showDialog('createDialog')">新增表單</v-btn>
            <!-- create dialog -->
          </v-toolbar>
        </template>

        <template v-slot:item.action="{ item }">
          <v-btn class="mr-5" icon color="blue" dark>
            <v-icon @click="addVersion(item)">add</v-icon>
          </v-btn>
          <v-btn class="mr-5" icon color="blue" dark>
            <v-icon @click="editItem(item)">edit</v-icon>
          </v-btn>
          <v-btn icon color="red">
            <v-icon @click="deleteItem(item)">delete</v-icon>
          </v-btn>
        </template>
        <!-- expand table -->
        <template v-slot:item.name="{ item }">
          <v-btn text class="text-transform-none">{{ item.name }}</v-btn>
        </template>
        <template v-slot:item.version="{ item }">
          <v-chip outlined color="blue" dark>{{ item.version }}</v-chip>
        </template>

        <template v-slot:expanded-item="{headers, item}">
          <td :colspan="headers.length">
            <v-data-table
              class="ma-5"
              hide-default-footer
              :headers="expandedHeader"
              :items="item.versions"
              sort-by="version"
              sort-desc
            >
              <template v-slot:item.action="{ item }">
                <v-btn color="blue" class="mr-1" outlined>應用</v-btn>
                <v-btn color="blue" class="mr-1" outlined @click="openFormBuilder(item)">編輯</v-btn>
                <v-btn color="blue" class="mr-1" outlined @click="previewForm(item)">預覽</v-btn>
              </template>
            </v-data-table>
          </td>
        </template>
      </v-data-table>
    </v-app>

    <v-dialog v-model="createDialog" max-width="1000px">
      <v-card height="100%">
        <v-card-title>
          <span>新增表單</span>
        </v-card-title>
        <v-card-text>
          <v-text-field required label="表單名稱"></v-text-field>
          <v-text-field required label="備註"></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="closeDialog('createDialog')">取消</v-btn>
          <v-btn dark>新增</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="previewDialog">
      <v-card class="pa-5">
        <formio id="formRender" :form="formComponent" :options="{noAlerts:true}"></formio>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import SaveDialog from '../components/Dialogs/SaveCancelDialog'
import { Form } from 'vue-formio'
import * as Token from '../API/Token'
import * as APIForm from '../API/ApiForm'
export default {
  computed:{
    cardHeight: function(){
      console.log("cardHeight",window.innerHeight)
      return window.innerHeight - 170
    }
  },
data () {
  return{
    formComponent:{},
    dialog: false,
    previewDialog:false,
    createDialog:false,
    search: '',
    
    headers: [
      { text: '', value: 'data-table-expand' },
      { text: '名稱', align: 'left', value: 'name'},
      { text: '版本', value: 'version' },
      { text: 'createTime', value: 'createTime' },
      { text: 'createUser', value: 'createUser' },
      { text: '說明', value: 'memo' },
      { text: '',align:'center', value: 'action', sortable: false },
    ],
    desserts:[
      {
          name: 'HanHanSoCool',
          version: 2,
          createTime: '2019/11/01',
          createUser: '胡聖翰',
          memo: "",
          versions:[
            {
              name: 'HanHanSoCool',
              formId: '0d86a364-9fb8-4ee6-81df-f103636ca293',
              version: 1,
              createTime: '2019/11/01',
              createUser: '胡聖翰',
            },
            {
              name: 'HanHanSoCool',
              formId: '4dd0a06b-53ab-4d97-b5e8-e31d7fe2bb84',
              version: 2,
              createTime: '2019/11/02',
              createUser: '胡聖翰',
            }
          ]
        },
        {
          name: 'new form',
          version: 1,
          createTime: '2019/11/01',
          createUser: '胡聖翰',
          memo: "",
          versions:[
            {
              name: 'new form',
              formId: '0000000',
              version: 1,
              createTime: '2019/11/01',
              createUser: '胡聖翰',
            }
          ]
        },
    ],
    expandedHeader: [
     
      { text: '版次', align:'center', value: 'version' },
      { text: '建立時間', value: 'createTime'},
      { text: '建立者', value: 'createUser'},
      { text: '',align:'right', value: 'action', sortable: false },
       
    ],
    editedIndex: -1,
    editedItem: {
     name: '',
          version: 1,
          createTime: '2019/11/01',
          createUser: '胡聖翰',
          memo: "",
          versions:[
            {
              version: 1,
              createTime: '2019/11/01',
              createUser: '胡聖翰',
            },
          ]
    },
    defaultItem: {
      name: '',
          version: 1,
          createTime: '2019/11/01',
          createUser: '胡聖翰',
          memo: "",
          versions:[
            {
              version: 1,
              createTime: '2019/11/01',
              createUser: '胡聖翰',
            },
          ]
    },
  }
},
components:{
  formio:Form,
  SaveDialog
},
computed:{
  formTitle(){
    return this.$data.editedIndex === -1 ? "新表單" : "編輯表單"
  }
},
methods:{
  showDialog(name){
    switch (name){
      case "createDialog":
      this.$data.createDialog = true
      break
      case "previewDialog":
      this.$data.previewDialog = true
      break;
    }
  },
  previewForm(item){
    let id = item.formId
    Token.getToken().then(token => {
          APIForm.getForm(id).then(obj => {
            let form  = {display:'form', components:obj['Components']}
            this.$data.formComponent = form
            this.$data.previewDialog = true
          })
        })
  },
  closeDialog(name){
    switch (name){
      case "createDialog":
      this.$data.createDialog = false
      break;
      case "previewDialog":
      this.$data.previewDialog = false
      break;
    }
  },
  createForm(){
    console.log("createForm",this.editedItem)
      this.desserts.push(this.editedItem)
      this.close()
  },
  openFormBuilder(item){
    console.log("open form ", item.formId)
    if(item.formId === ""){return}
    this.$router.push({name: 'formBuilder', params:{formId:item.formId}})
  },
  addVersion(item){
    console.log("item",item)
    let version = item.version + 1
    let object = {
       version: version,
       createTime: Date(),
       createUser: '胡聖翰',
    }
    item.versions.push(object)
    item.version = version
    console.log("item push",this.$data.desserts)

  },
  editItem(){
    this.$data.editedItem = this.$data.defaultItem
  },
  editVersionItem(item){
    console.log("editVersionItem",item)
    this.editedIndex = this.desserts.indexOf(item)
    this.editedItem = Object.assign({}, item)
  },
  deleteItem(item){
const index = this.desserts.indexOf(item)
      confirm('確定要移除表單？') && this.desserts.splice(index, 1)
  },
  close(){
    this.dialog = false
    setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      }, 300)
  },
  save(){
      if (this.editedIndex > -1) {
        Object.assign(this.desserts[this.editedIndex], this.editedItem)
      } else {
        this.desserts.push(this.editedItem)
      }
      this.close()
  },
  preview(){
    this.previewDialog = true
  }

},
beforeMount () {
    Token.getToken().then(token => {
      APIForm.getForm().then(obj => {
        this.formComponent = {
          display: 'form',
          components: obj['Components']
        }
      })
    })
  }
}
</script>

<style>
.text-transform-none {
  text-transform: none;
}
</style>