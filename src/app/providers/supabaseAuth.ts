import { useUserStore } from '@/entities/user'
import { supabase } from '@/shared/config'
import { clearAuthHash } from '@/shared/lib'

const setupSupabaseAuth = async () => {
  const userStore = useUserStore()

  const { data, error } = await supabase.auth.getSession()

  if (error) {
    userStore.setSession(null)
  } else {
    userStore.setSession(data.session ?? null)
  }

  const { data: sub } = supabase.auth.onAuthStateChange((event, session) => {
    userStore.setSession(session)

    if (event === 'SIGNED_IN' || event === 'PASSWORD_RECOVERY') {
      clearAuthHash()
    }
  })

  if (import.meta.hot) {
    import.meta.hot.dispose(() => sub.subscription.unsubscribe())
  }
}

export { setupSupabaseAuth }
