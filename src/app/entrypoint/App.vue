<script setup lang="ts">
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'

import { routesName } from '@app/router'
import { useAuth } from '@/features/auth/model'
import { useUserStore } from '@/entities/user/model'
import { BaseButton } from '@/shared/ui'

const userStore = useUserStore()
const { isAuthed, ready } = storeToRefs(userStore)
const { loadUser } = userStore
const { signOut } = useAuth()

const { home, register, login, createPassword } = routesName

onMounted(() => {
  loadUser()
})
</script>

<template>
  <header v-if="ready" class="flex justify-between">
    <nav class="flex gap-5">
      <RouterLink :to="{ name: home }" class="text-blue-800">Вернуться на главную</RouterLink>
      <RouterLink v-if="!isAuthed" :to="{ name: register }" class="text-blue-800"
        >Пройти регистрацию</RouterLink
      >
      <RouterLink v-if="!isAuthed" :to="{ name: login }" class="text-blue-800"
        >Ввести свой логин</RouterLink
      >
      <RouterLink :to="{ name: createPassword }" class="text-blue-800">Новый пароль</RouterLink>
    </nav>
    <BaseButton v-if="isAuthed" @click="signOut" textButton="Выход" class="text-red-800" />
  </header>
  <div v-else>Загрузка...</div>

  <RouterView />
</template>
