import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import About from './views/About.vue';
import LoginView from './views/LoginView.vue';
import Forms from './views/Forms.vue';
import FormBuilder from './views/FormBuilder.vue';
import ProjectMenu from './views/ProjectMenu.vue';
import ProjectFormGroups from './views/ProjectFormGroups.vue';
import CreatedForms from './views/CreatedForms.vue'

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      component: About
    },
    {
      path: '/LoginView',
      name: 'loginView',
      component: LoginView
    },
    {
      path: '/Forms',
      name: 'forms',
      component: Forms
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
      path: '/ProjectFormGroups',
      name: 'ProjectFormGroups',
      component: ProjectFormGroups
    },
    {
      path: '/CreatedForms',
      name: 'CreatedForms',
      component: CreatedForms
    },
    {
      path: '**',
      name: 'notFound',
      component: Home
    },
  ],
});
