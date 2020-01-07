# vuetify-formio
Integrating vuetify with the formio.io library

This project is for those who want to get started on a project with vue, vuetify and vue-formio. This can be used as a boiler plate to get you started as quickly as possible


Clone the repository into a desirable folder

run the following commands
1. npm install
2. npm run serve

The two commands will install all node modules required for the application and start a development server

# Package 安裝
```
npm install syncoboxform
```
引用scss
```
@import "~syncoboxform/src/styles.scss" 
```

# 特殊router設定
formBuilder router加入下列設定
```
{
  path: '/FormBuilder/:formId?',
  name: 'formBuilder',
  component: FormBuilder,
},
```
# 標籤
1. sb-form-builder : FormIO form builder 頁面
2. sb-created-forms: 專案中的所有表單結構頁面
3. sb-project-form-results: 專案表單寫結果頁面
# 警告
目前動態生成的html會接收不到css，主要發生在formio拖曳的控件以及彈出視窗
