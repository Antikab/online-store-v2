<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import { useForm, useField } from 'vee-validate'
import { useRouter } from 'vue-router'

import { useAuth, signInSchema, GoogleAuthButton } from '@/features/auth'
import { routesName } from '@/shared/config'
import { BaseButton } from '@/shared/ui'

const router = useRouter()

const { handleSubmit } = useForm({
  validationSchema: toTypedSchema(signInSchema),
  initialValues: {
    email: '',
    password: '',
  },
})

const { value: email, errorMessage: emailError, meta: emailMeta } = useField('email')
const { value: password, errorMessage: passwordError, meta: passwordMeta } = useField('password')

const { signIn, loading } = useAuth()

const submitForm = handleSubmit(async ({ email, password }) => {
  await signIn({ email, password })
  await router.replace({ name: routesName.home })
})
</script>

<template>
  <div>логин страница</div>
  <form @submit.prevent="submitForm" class="w-fit flex flex-col space-y-4">
    <GoogleAuthButton />
    <input
      v-model="email"
      @blur="emailMeta.touched = true"
      type="email"
      placeholder="designer@gmail.com"
      class="border rounded-lg px-3 py-2"
      :class="{ 'ring-red-300': emailMeta.touched && emailError }"
    />
    <p v-if="emailMeta.touched && emailError" class="text-sm text-red-500">{{ emailError }}</p>

    <div class="flex justify-center items-end gap-2">
      <input
        v-model="password"
        @blur="passwordMeta.touched = true"
        type="password"
        placeholder="Harry934PotteR"
        class="border rounded-lg px-3 py-2"
        :class="{ 'ring-red-300': passwordMeta.touched && passwordError }"
      />
      <RouterLink :to="{ name: routesName.resetPassword }" class="text-blue-800"
        >Forget your password</RouterLink
      >
    </div>
    <p v-if="passwordMeta.touched && passwordError" class="text-sm text-red-500">
      {{ passwordError }}
    </p>

    <BaseButton
      type="submit"
      :disabled="loading"
      class="w-[167px] h-[54px] flex justify-center items-center bg-purple px-5 py-4 text-white rounded-lg text-18"
    >
      Sign In
    </BaseButton>
  </form>

  Don't have an account?
  <RouterLink :to="{ name: routesName.register }" class="text-blue-800">Sign up</RouterLink>
</template>
