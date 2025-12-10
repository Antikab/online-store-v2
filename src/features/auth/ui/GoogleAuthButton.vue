<script setup lang="ts">
import { ref } from 'vue'
import { useAuth } from '@features/auth/api'
import { BaseButton } from '@/shared/ui'
import { IconGoogle } from '@shared/assets/icons'

const googleLoading = ref(false)

const { signInWithGoogle } = useAuth()

const handleClick = async () => {
  googleLoading.value = true
  await signInWithGoogle()
}
</script>

<template>
  <BaseButton
    @click="handleClick"
    :disabled="googleLoading"
    type="button"
    class="h-[58px] flex justify-center px-5 py-4 rounded-lg bg-white text-purple text-18 border border-gray gap-2"
  >
    <inline-svg class="w-5" :src="IconGoogle" />
    <span>Continue With Google</span>
  </BaseButton>
</template>
