import { createRouter, createWebHistory } from 'vue-router'
import Home from './pages/Home.vue'
import ProjectDetailPage from './pages/projects/ProjectDetailPage.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: Home },
    { path: '/projects/:slug', component: ProjectDetailPage },
    { path: '/oakstone-smart-video-tool-demo', redirect: '/projects/oakstone' },
  ],
})

export default router
