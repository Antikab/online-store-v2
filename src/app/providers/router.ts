import { createWebHistory, createRouter } from 'vue-router'
import { routes, routesName } from '@app/router'
import { supabase } from '@/shared/config'

const setupRouter = createRouter({
  history: createWebHistory(),
  routes,
})

setupRouter.beforeEach(async (to) => {
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (to.meta.requiresAuth && !session) return { name: routesName.login }
})

export { setupRouter }
