import { type NavigationGuard } from 'vue-router'

import { supabase } from '@/shared/config'
import { routesName } from '../routes'

const authGuard: NavigationGuard = async (to) => {
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (to.meta.requiresAuth && !session) return { name: routesName.login }
}

export { authGuard }
