import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

import { type User } from '@supabase/supabase-js'
import { supabase } from '@/shared/config'

const useUserStore = defineStore('user', () => {
  const user = ref<User | null>(null)
  const ready = ref(false)
  const isAuthed = computed(() => !!user.value)

  const loadUser = async () => {
    const {
      data: { user: supaUser },
    } = await supabase.auth.getUser()

    user.value = supaUser || null
    ready.value = true
  }

  supabase.auth.onAuthStateChange((_event, session) => {
    user.value = session?.user || null
  })

  return {
    user,
    ready,
    isAuthed,
    loadUser,
  }
})

export { useUserStore }
