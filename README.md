# Form Comonents

# 更新內容

1. router設定更新
2. 新增component : sb-form-render

# Package安裝

    npm install syncoboxform

# router設定

在router.js下加入formBuilder設定，如下

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

## sb-form-render

給予控件formId、versionId、templeteId與resultId，即可選染表單

資料格式：

    {
      formId: "guid",
      versionId: "guid",
      templeteId: "",
      resultId: ""
    }

使用方法：

    <v-dialog v-model="previewDialog">
      <sb-form-render v-model="previewFormData" />
    </v-dialog>