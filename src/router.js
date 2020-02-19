import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import FormBuilder from './views/FormBuilder.vue';
import ProjectMenu from './views/ProjectMenu.vue';
import ProjectFormResults from './views/ProjectFormResults.vue';
import ProjectFlows from './views/ProjectFlows.vue'
import CreatedForms from './views/CreatedForms.vue'
import CreatedFlows from './views/CreatedFlows.vue'
import FlowBuilder from './views/FlowBuilder.vue'

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
      path: '/FormBuilder/:formId?/:versionId?',
      name: 'formBuilder',
      component: FormBuilder,
    },
    {
      path: '/FlowBuilder/:flowVersion?',
      name: 'flowBuilder',
      component: FlowBuilder
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
      path: '/ProjectFlows',
      name: 'projectFlows',
      component: ProjectFlows
    },
    {
      path: '/CreatedForms',
      name: 'createdForms',
      component: CreatedForms
    },
    {
      path: '/CreatedFlows',
      name: 'createdFlows',
      component: CreatedFlows
    },
    {
      path: '/Home',
      name: 'home',
      component: Home
    },
    {
      path: '**',
      name: 'notFound',
      component: Home
    },
  ],
});
