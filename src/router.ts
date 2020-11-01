import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '@/views/Home.vue'
import Subject from '@/views/Subject.vue'
import Reference from '@/views/Reference.vue'
import Resource from '@/views/Resource.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  { 
    path: '/Subject/:id/:version', 
    name: 'Subject',
    props: true, 
    component: Subject
  },
  { 
    path: '/Subject/:subject_id/:subject_version/Reference/:resource_id', 
    name: 'Reference',
    props: true, 
    component: Reference
  },
  { 
    path: '/Resource/:resource_id/:resource_version', 
    name: 'Resource',
    props: true, 
    component: Resource
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
