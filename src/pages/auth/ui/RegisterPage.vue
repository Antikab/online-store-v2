<script setup lang="ts">
import { useForm, useField } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { z } from 'zod'

import { routesName } from '@app/router'
import { useAuth } from '@entities/user/model/useAuth'
import { BaseButton } from '@/shared/ui'

const schema = z.object({
  email: z.email('Введите корректный e-mail').trim().toLowerCase(),
  password: z.string().min(6, 'Минимум 6 символов').trim(),
  firstName: z.string().min(3, 'Минимум 3 символа').trim().toLowerCase(),
})

const { handleSubmit } = useForm({
  validationSchema: toTypedSchema(schema),
  initialValues: {
    email: '',
    password: '',
    firstName: '',
  },
})

const { value: email, errorMessage: emailError, meta: emailMeta } = useField('email')
const { value: password, errorMessage: passwordError, meta: passwordMeta } = useField('password')
const {
  value: firstName,
  errorMessage: firstNameError,
  meta: firstNameMeta,
} = useField('firstName')

const { signUp } = useAuth()

const submitForm = handleSubmit(async ({ email, password, firstName }) => {
  await signUp({ email, password, firstName })
})
</script>

<template>
  <div>регистрация страница</div>
  <form @submit.prevent="submitForm" class="w-fit flex flex-col space-y-4">
    <input
      v-model="email"
      @blur="emailMeta.touched = true"
      type="email"
      placeholder="designer@gmail.com"
      class="border rounded-lg px-3 py-2"
      :class="{ 'ring-red-300': emailMeta.touched && emailError }"
    />
    <p v-if="emailMeta.touched && emailError" class="text-sm text-red-500">{{ emailError }}</p>

    <input
      v-model="password"
      @blur="passwordMeta.touched = true"
      type="password"
      placeholder="Harry934PotteR"
      class="border rounded-lg px-3 py-2"
      :class="{ 'ring-red-300': passwordMeta.touched && passwordError }"
    />
    <p v-if="passwordMeta.touched && passwordError" class="text-sm text-red-500">
      {{ passwordError }}
    </p>
    <input
      v-model="firstName"
      @blur="firstNameMeta.touched = true"
      type="text"
      placeholder="Harry"
      class="border rounded-lg px-3 py-2"
      :class="{ 'ring-red-300': firstNameMeta.touched && firstNameError }"
    />
    <p v-if="firstNameMeta.touched && firstNameError" class="text-sm text-red-500">
      {{ firstNameError }}
    </p>
    <BaseButton
      class="w-[167px] h-[54px] flex justify-center items-center bg-purple px-5 py-4 text-white rounded-lg text-18"
      textButton="Sign Up"
    />
  </form>

  Already have an account?
  <RouterLink :to="{ name: routesName.login }" class="text-blue-500">Log in</RouterLink>
</template>
arsprosvet@mail.ru
