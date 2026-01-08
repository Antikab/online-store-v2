import { useUserStore } from '@/entities/user'
import { supabase } from '@/shared/config'
import { clearAuthHash } from '@/shared/lib'

const setupSupabaseAuth = async () => {
  const userStore = useUserStore()

  await userStore.init()

  supabase.auth.onAuthStateChange((event, session) => {
    userStore.setSession(session)

    if (event === 'INITIAL_SESSION' || event === 'SIGNED_IN' || event === 'PASSWORD_RECOVERY') {
      clearAuthHash()
    }
  })
}

export { setupSupabaseAuth }
