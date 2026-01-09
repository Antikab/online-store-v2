import { type NavigationGuard } from 'vue-router'

import { routesName } from '@/shared/config'
import { useUserStore } from '@/entities/user'

const authGuard: NavigationGuard = (to) => {
  const userStore = useUserStore()

  if (to.meta.requiresAuth && !userStore.isAuthed) {
    return { name: routesName.login }
  }

  if ((to.name === routesName.login || to.name === routesName.register) && userStore.isAuthed) {
    return { name: routesName.home }
  }
}

export { authGuard }
