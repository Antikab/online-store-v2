import { useUserStore } from '@/entities/user'
import { supabase } from '@/shared/config'
import { clearAuthHash } from '@/shared/lib'

const setupSupabaseAuth = async () => {
  const userStore = useUserStore()

  await new Promise<void>((resolve) => {
    const { data } = supabase.auth.onAuthStateChange((event, session) => {
      userStore.setSession(session)

      if (event === 'INITIAL_SESSION' || event === 'SIGNED_IN' || event === 'PASSWORD_RECOVERY') {
        clearAuthHash()
      }

      if (event === 'INITIAL_SESSION') resolve()
    })

    if (import.meta.hot) {
      import.meta.hot.dispose(() => data.subscription.unsubscribe())
    }
  })
}

export { setupSupabaseAuth }
