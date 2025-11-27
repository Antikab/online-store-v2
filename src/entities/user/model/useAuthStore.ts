import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

import { supabase } from '@/shared/config/supabaseClient'

export const useAuthStore = defineStore('counter', () => {
  const count = ref(0)
  const name = ref('Иван')
  const doubleCount = computed(() => count.value * 2)
  function increment() {
    count.value++
  }

  return { count, name, doubleCount, increment }
})
