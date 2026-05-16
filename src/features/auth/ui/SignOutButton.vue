<script setup lang="ts">
import { useRouter } from 'vue-router'

import { routesName } from '@/shared/config'
import { BaseButton } from '@/shared/ui'

import { useAuth } from '../api'

const router = useRouter()
const { signOut, loading, errorMessage } = useAuth()

const handleSignOut = async () => {
  try {
    await signOut()
    await router.replace({ name: routesName.login })
  } catch {
    // Ошибка уже сохранена в errorMessage внутри useAuth.
  }
}
</script>

<template>
  <div>
    <BaseButton
      type="button"
      :disabled="loading"
      class="inline-flex items-center gap-3 text-left font-medium text-gray/80 transition hover:text-purple"
      @click="handleSignOut"
    >
      <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M15 17l5-5-5-5M20 12H9m3 8H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h6"
          stroke="currentColor"
          stroke-width="1.8"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
      <span>{{ loading ? 'Signing out...' : 'Sign out' }}</span>
    </BaseButton>

    <p v-if="errorMessage" class="mt-2 text-sm text-red-500">
      {{ errorMessage }}
    </p>
  </div>
</template>
