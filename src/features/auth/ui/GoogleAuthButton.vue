<script setup lang="ts">
import { ref } from 'vue'
import { useAuth } from '@features/auth'
import { BaseButton } from '@/shared/ui'
import { IconGoogle } from '@shared/assets'

const googleLoading = ref(false)

const { signInWithGoogle, errorMessage } = useAuth()

const handleClick = async () => {
  if (googleLoading.value) return
  googleLoading.value = true

  try {
    await signInWithGoogle()
  } catch {
    // useAuth сохраняет безопасное сообщение для отображения ниже.
  } finally {
    googleLoading.value = false
  }
}
</script>

<template>
  <BaseButton
    @click="handleClick"
    :disabled="googleLoading"
    class="h-[58px] flex justify-center px-5 py-4 rounded-lg bg-white text-purple text-18 border border-gray gap-2"
  >
    <inline-svg class="w-5" :src="IconGoogle" />
    <span>Continue With Google</span>
  </BaseButton>
  <p v-if="errorMessage" role="alert" class="text-sm text-red-500">{{ errorMessage }}</p>
</template>
