import { createWebHistory, createRouter } from 'vue-router'
import { routesConfig } from '../router/routes'
import { authGuard, guestGuard } from '../router/guards'

const setupRouter = createRouter({
  history: createWebHistory(),
  routes: routesConfig,
})

setupRouter.beforeEach(authGuard)
setupRouter.beforeEach(guestGuard)

export { setupRouter }
