import { createWebHistory, createRouter } from 'vue-router'
import { routesConfig } from '@app/router/routes'
import { authGuard } from '@app/router/guards'

const setupRouter = createRouter({
  history: createWebHistory(),
  routes: routesConfig,
})

setupRouter.beforeEach(authGuard)

export { setupRouter }
