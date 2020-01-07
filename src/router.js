import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import FormBuilder from './views/FormBuilder.vue';
import ProjectMenu from './views/ProjectMenu.vue';
import ProjectFormResults from './views/ProjectFormResults.vue';
import CreatedForms from './views/CreatedForms.vue'

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: '',
      component: ProjectMenu
    },
    {
      path: '/FormBuilder/:formId?',
      name: 'formBuilder',
      component: FormBuilder,
    },
    {
      path: '/ProjectMenu',
      name: 'projectBuilder',
      component: ProjectMenu
    },
    {
      path: '/ProjectFormResults',
      name: 'projectFormResults',
      component: ProjectFormResults
    },
    {
      path: '/CreatedForms',
      name: 'createdForms',
      component: CreatedForms
    },
    {
      path: '**',
      name: 'notFound',
      component: Home
    },
  ],
});
