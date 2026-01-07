import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

import { type User, type Session } from '@supabase/supabase-js'
import { supabase } from '@/shared/config'

const useUserStore = defineStore('user', () => {
  const user = ref<User | null>(null)
  const ready = ref(false)

  const isAuthed = computed(() => !!user.value)

  const setSession = (session: Session | null) => {
    user.value = session?.user ?? null
    if (!ready.value) ready.value = true
  }

  const init = async () => {
    if (ready.value) return

    try {
      const {
        data: { user: supaUser },
      } = await supabase.auth.getUser()

      user.value = supaUser ?? null
    } finally {
      ready.value = true
    }
  }

  return {
    user,
    ready,
    isAuthed,
    init,
    setSession,
  }
})

export { useUserStore }
