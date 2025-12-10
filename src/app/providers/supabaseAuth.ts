import { supabase } from '@/shared/config'
import { useUserStore } from '@/entities/user'

const setupSupabaseAuthListener = () => {
  supabase.auth.onAuthStateChange((_event, session) => {
    const userStore = useUserStore()
    userStore.user = session?.user || null
  })
}

export { setupSupabaseAuthListener }
