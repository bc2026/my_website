import { createRouter, createWebHistory } from 'vue-router'
import OakstoneDemo from './pages/projects/OakstoneDemo.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/oakstone-smart-video-tool-demo' },
    { path: '/oakstone-smart-video-tool-demo', component: OakstoneDemo },
  ],
})

export default router