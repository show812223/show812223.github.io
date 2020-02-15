
# 更新內容0.27.1

1. 新增component : sb-created-flows

# Package安裝

    npm install syncoboxform

# router設定

- sb-form-builder設定，如下

    {
      path: '/FormBuilder/:formId?/:versionId?',
      name: 'formBuilder',
      component: FormBuilder,
    },

# Components

- sb-form-builder : FormIO form builder 頁面
- sb-created-forms : 專案中的所有表單結構頁面
- sb-project-form-results : 專案表單寫結果頁面
- sb-form-render : 渲染表單
- sb-created-flows : 專案中所有流程的管理介面

## sb-form-render

給予控件formId、versionId、templeteId與resultId，即可選染表單

資料格式：

    {
    	formId: "guid",
      versionId: "guid",
      templeteId: "",
      resultId: ""
    }

props:

| name          | type          |
| ------------- | ------------- |
| API           | Object        |
|readOnly       | Bool (default false)  |


使用方法：

    <v-dialog v-model="previewDialog">
    	<sb-form-render v-model="previewFormData" :readOnly="true"/>
    </v-dialog>

## sb-created-flows

顯示專案或是使用者的所有流程

需要設定跳轉到flowBuilder的router :

    {
    	path: '/<自己設定router name>/:versionId?',
    	name: '<自己設定router name>',
        component: <自己的 component name>,
    }

設定props :

    <sb-created-flows :flowBuilderRouterName="<your router name>" />