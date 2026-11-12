<script setup lang="ts">
import { useForm } from '@tanstack/vue-form'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

import { useAuth, signUpSchema, GoogleAuthButton } from '@features/auth'
import { routesName } from '@/shared/config'
import { BaseButton, BaseInput } from '@shared/ui'

const router = useRouter()

const { signUp, loading, errorMessage } = useAuth()
const needsEmailConfirmation = ref(false)

const form = useForm({
  defaultValues: {
    email: '',
    password: '',
    firstName: '',
  },
  validators: {
    onChange: signUpSchema,
    onBlur: signUpSchema,
    onSubmit: signUpSchema,
  },
  onSubmit: async ({ value }) => {
    try {
      const data = await signUp(signUpSchema.parse(value))
      if (!data.session) {
        needsEmailConfirmation.value = true
        return
      }
    } catch {
      // Ошибка запроса уже сохранена в errorMessage.
      return
    }
    await router.replace({ name: routesName.home })
  },
})
</script>

<template>
  <h1>Sign up</h1>
  <p v-if="needsEmailConfirmation" role="status">
    Check your inbox to confirm your email. If you already have an account, sign in instead.
  </p>
  <form
    v-else
    novalidate
    @submit.prevent="form.handleSubmit()"
    class="w-fit flex flex-col space-y-4"
  >
    <GoogleAuthButton />
    <form.Field name="email">
      <template #default="{ field }">
        <BaseInput
          :model-value="field.state.value"
          @update:model-value="field.handleChange"
          @blur="field.handleBlur"
          name="email"
          aria-label="Email"
          type="email"
          autocomplete="email"
          placeholder="designer@gmail.com"
          class="border rounded-lg px-3 py-2"
          :class="{
            'ring-red-300': field.state.meta.isTouched && field.state.meta.errors.length > 0,
          }"
        />
        <p
          v-if="field.state.meta.isTouched && field.state.meta.errors.length > 0"
          class="text-sm text-red-500"
        >
          {{ field.state.meta.errors[0]?.message }}
        </p>
      </template>
    </form.Field>

    <form.Field name="password">
      <template #default="{ field }">
        <BaseInput
          :model-value="field.state.value"
          @update:model-value="field.handleChange"
          @blur="field.handleBlur"
          name="password"
          aria-label="Password"
          type="password"
          autocomplete="new-password"
          placeholder="Harry934PotteR"
          class="border rounded-lg px-3 py-2"
          :class="{
            'ring-red-300': field.state.meta.isTouched && field.state.meta.errors.length > 0,
          }"
        />
        <p
          v-if="field.state.meta.isTouched && field.state.meta.errors.length > 0"
          class="text-sm text-red-500"
        >
          {{ field.state.meta.errors[0]?.message }}
        </p>
      </template>
    </form.Field>
    <form.Field name="firstName">
      <template #default="{ field }">
        <BaseInput
          :model-value="field.state.value"
          @update:model-value="field.handleChange"
          @blur="field.handleBlur"
          name="firstName"
          aria-label="First name"
          type="text"
          autocomplete="given-name"
          placeholder="Harry"
          class="border rounded-lg px-3 py-2"
          :class="{
            'ring-red-300': field.state.meta.isTouched && field.state.meta.errors.length > 0,
          }"
        />
        <p
          v-if="field.state.meta.isTouched && field.state.meta.errors.length > 0"
          class="text-sm text-red-500"
        >
          {{ field.state.meta.errors[0]?.message }}
        </p>
      </template>
    </form.Field>
    <p v-if="errorMessage" role="alert" class="text-sm text-red-500">{{ errorMessage }}</p>
    <RouterLink :to="{ name: routesName.resetPassword }" class="text-blue-800">
      Already have an account but no password? Reset password
    </RouterLink>
    <BaseButton
      type="submit"
      :disabled="loading"
      class="w-[167px] h-[54px] flex justify-center items-center bg-purple px-5 py-4 text-white rounded-lg text-18"
    >
      Sign Up
    </BaseButton>
  </form>

  Already have an account?
  <RouterLink :to="{ name: routesName.login }" class="text-blue-800">Log in</RouterLink>
</template>
