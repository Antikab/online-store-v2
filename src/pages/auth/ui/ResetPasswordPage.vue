<script setup lang="ts">
import { useForm } from '@tanstack/vue-form'
import { ref } from 'vue'

import { useAuth, resetPasswordSchema } from '@/features/auth'
import { routesName } from '@/shared/config'
import { BaseButton, BaseInput } from '@/shared/ui'

const { resetPassword, loading, errorMessage } = useAuth()
const emailSent = ref(false)

const form = useForm({
  defaultValues: {
    email: '',
  },
  validators: {
    onChange: resetPasswordSchema,
    onBlur: resetPasswordSchema,
    onSubmit: resetPasswordSchema,
  },
  onSubmit: async ({ value }) => {
    const { email } = resetPasswordSchema.parse(value)
    try {
      await resetPassword(email)
      emailSent.value = true
    } catch {
      // Ошибка запроса уже сохранена в errorMessage.
    }
  },
})
</script>

<template>
  <h1>Reset your password</h1>
  <p v-if="emailSent" role="status">
    If an account exists for this email, you will receive a password reset link. Check your inbox
    and spam folder.
  </p>
  <form
    v-else
    novalidate
    @submit.prevent="form.handleSubmit()"
    class="w-fit flex flex-col space-y-4"
  >
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

    <p v-if="errorMessage" role="alert" class="text-sm text-red-500">{{ errorMessage }}</p>
    <BaseButton
      type="submit"
      :disabled="loading"
      class="h-[54px] flex justify-center items-center bg-purple px-5 py-4 text-white rounded-lg text-18"
    >
      Reset password
    </BaseButton>
  </form>
  <RouterLink :to="{ name: routesName.login }" class="text-blue-800">Back to sign in</RouterLink>
</template>
