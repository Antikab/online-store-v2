<script setup lang="ts">
import { storeToRefs } from 'pinia'

import { useAuth } from '@/features/auth/api'
import { useUserStore } from '@/entities/user/model'
import { routesName } from '@/shared/config/router'
import { BaseButton } from '@/shared/ui'

const { home, register, login, updatePassword } = routesName
const userStore = useUserStore()
const { isAuthed, ready } = storeToRefs(userStore)
const { signOut } = useAuth()

const handleLogout = async () => {
  await signOut()
}
</script>

<template>
  <header v-if="ready" class="flex justify-between">
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
    <BaseButton v-if="isAuthed" @click="handleLogout" class="text-red-800">Выход</BaseButton>
  </header>
  <div v-else>Загрузка...</div>
</template>
