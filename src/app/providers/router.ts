// app/providers/router.ts
import { createWebHistory, createRouter } from 'vue-router'
import { routes } from '../router/routes'

const setupRouter = createRouter({
  history: createWebHistory(),
  routes,
})

export { setupRouter }
