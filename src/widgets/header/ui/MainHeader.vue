<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'

import { useAuth } from '@/features/auth'
import { useUserStore } from '@/entities/user'
import { routesName } from '@/shared/config'
import { BaseButton } from '@/shared/ui'

const router = useRouter()

const { home, register, login, updatePassword } = routesName

const userStore = useUserStore()
const { isAuthed } = storeToRefs(userStore)

const { signOut, loading } = useAuth()

const handleLogout = async () => {
  await signOut()
  await router.replace({ name: routesName.login })
}
</script>

<template>
  <header class="flex justify-between">
    <nav class="flex gap-5">
      <RouterLink :to="{ name: home }" class="text-blue-800"> Вернуться на главную </RouterLink>

      <RouterLink v-if="!isAuthed" :to="{ name: register }" class="text-blue-800">
        Пройти регистрацию
      </RouterLink>

      <RouterLink v-if="!isAuthed" :to="{ name: login }" class="text-blue-800">
        Ввести свой логин
      </RouterLink>

      <RouterLink v-if="isAuthed" :to="{ name: updatePassword }" class="text-blue-800">
        Новый пароль
      </RouterLink>
    </nav>

    <BaseButton :disabled="loading" v-if="isAuthed" @click="handleLogout" class="text-red-800"
      >Выход</BaseButton
    >
  </header>
</template>
