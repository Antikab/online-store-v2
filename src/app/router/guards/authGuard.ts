import { type NavigationGuard } from 'vue-router'

import { supabase } from '@/shared/config/supabase'
import { routesName } from '@/shared/config/router'

const authGuard: NavigationGuard = async (to) => {
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (to.meta.requiresAuth && !session) {
    return { name: routesName.login }
  }

  if ((to.name === routesName.login || to.name === routesName.register) && session) {
    return { name: routesName.home }
  }
}

export { authGuard }
