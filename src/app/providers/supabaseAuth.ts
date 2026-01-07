import { useUserStore } from '@/entities/user'
import { supabase } from '@/shared/config'
import { clearAuthHash } from '@/shared/lib'

const setupSupabaseAuth = async () => {
  const userStore = useUserStore()

  await userStore.init()

  supabase.auth.onAuthStateChange((_event, session) => {
    userStore.setSession(session)
  })

  clearAuthHash()
}

export { setupSupabaseAuth }
