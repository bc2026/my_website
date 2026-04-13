import { createRouter, createWebHistory } from 'vue-router'
import Home from './pages/Home.vue'
import OakstoneDemo from './pages/projects/OakstoneDemo.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: Home },
    { path: '/oakstone-smart-video-tool-demo', component: OakstoneDemo },
  ],
})

export default router