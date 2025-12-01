<script setup lang="ts">
import { ref } from 'vue'

import { routesName } from '@app/router'
import { useAuth } from '@entities/user/model/useAuth'
import { BaseButton } from '@/shared/ui'

const formData = ref({
  email: '',
  password: '',
  firstName: '',
})

const { signUp } = useAuth()

const submitForm = async () => {
  try {
    await signUp({
      email: formData.value.email,
      password: formData.value.password,
      firstName: formData.value.firstName,
    })
  } catch (error) {
    console.log(error)
  }
}
</script>

<template>
  <div>регистрация страница</div>
  <form @submit.prevent="submitForm" class="space-y-4">
    <input v-model="formData.email" type="email" placeholder="designer@gmail.com" />
    <input v-model="formData.password" type="password" placeholder="Harry934PotteR" />
    <input v-model="formData.firstName" type="text" placeholder="Harry" />
    <BaseButton
      class="w-[167px] h-[54px] flex justify-center items-center bg-purple px-5 py-4 text-white rounded-lg text-18"
      textButton="Sign Up"
    />
  </form>

  Already have an account?
  <RouterLink :to="{ name: routesName.login }" class="text-blue-500">Log in</RouterLink>
</template>
arsprosvet@mail.ru
