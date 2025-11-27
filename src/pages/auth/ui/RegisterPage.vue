<!-- src/pages/auth/ui/RegisterPage.vue -->
<script setup lang="ts">
import { ref } from 'vue'

import { BaseButton } from '@/shared/ui'
import { routesName } from '@app/router'
const email = ref('')
</script>

<template>
  <div>регистрация страница</div>
  <input v-model="email" type="email" placeholder="designer@gmail.com" />
  <BaseButton
    class="w-[167px] h-[54px] flex justify-center items-center bg-purple px-5 py-4 text-white rounded-lg text-18"
    textButton="Sign Up"
  />

  Already have an account?
  <RouterLink :to="{ name: routesName.login }" class="text-blue-500">Log in</RouterLink>
</template>
