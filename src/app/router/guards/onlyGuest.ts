import { type NavigationGuard } from 'vue-router'

import { supabase } from '@/shared/config'
import { routesName } from '../routes'

const guestGuard: NavigationGuard = async (to) => {
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (session && (to.name === routesName.login || to.name === routesName.register))
    return { name: routesName.home }
}

export { guestGuard }
