import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { type Session } from '@supabase/supabase-js'

const useUserStore = defineStore('user', () => {
  const session = ref<Session | null>(null)

  const user = computed(() => session.value?.user ?? null)
  const isAuthed = computed(() => !!user.value)

  const setSession = (newSession: Session | null) => {
    session.value = newSession
  }

  return {
    user,
    isAuthed,
    setSession,
  }
})

export { useUserStore }
