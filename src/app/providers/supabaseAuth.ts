import { supabase } from '@/shared/config/supabase'
import { useUserStore } from '@/entities/user/model'

const setupSupabaseAuthListener = () => {
  supabase.auth.onAuthStateChange((_event, session) => {
    const userStore = useUserStore()
    userStore.user = session?.user || null
  })
}

export { setupSupabaseAuthListener }
