import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import Form from '../views/Forms.vue'
import FormBuilder from '../views/FormBuilder.vue'
import ProjectMenu from '../views/ProjectMenu.vue'

Vue.use(VueRouter)

const routes = [
  
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
    path: '/Forms',
    name: 'forms',
    component: Form
  },
  {
    path: '/FormBuilder',
    name: 'formBuilder',
    component: FormBuilder
  },
  {
    path: '/ProjectMenu',
    name: 'projectBuilder',
    component: ProjectMenu
  },
  {
    path: '**',
    name: 'notFound',
    component: Home
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
