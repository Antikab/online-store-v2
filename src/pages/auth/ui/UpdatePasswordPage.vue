<script setup lang="ts">
import { useForm } from '@tanstack/vue-form'
import { ref } from 'vue'

import { useUserStore } from '@/entities/user'
import { useAuth, updatePasswordSchema, SignOutButton } from '@/features/auth'
import { routesName } from '@/shared/config'
import { BaseButton, BaseInput } from '@/shared/ui'

const userStore = useUserStore()
const { updatePassword, loading, errorMessage } = useAuth()
const passwordSaved = ref(false)

const form = useForm({
  defaultValues: {
    password: '',
    confirmPassword: '',
  },
  validators: {
    onChange: updatePasswordSchema,
    onBlur: updatePasswordSchema,
    onSubmit: updatePasswordSchema,
  },
  onSubmit: async ({ value }) => {
    const { password } = updatePasswordSchema.parse(value)
    try {
      await updatePassword(password)
      passwordSaved.value = true
      form.reset()
    } catch {
      // Ошибка запроса уже сохранена в errorMessage.
    }
  },
})
</script>

<template>
  <h1>Set a password</h1>
  <div v-if="!userStore.isAuthed" role="status" class="space-y-3">
    <p>Sign in with Google or open a valid password reset link to set your password.</p>
    <p>Your reset link may have expired or already been used.</p>
    <RouterLink :to="{ name: routesName.resetPassword }" class="block text-blue-800">
      Request a new reset link
    </RouterLink>
    <RouterLink :to="{ name: routesName.login }" class="block text-blue-800">Sign in</RouterLink>
  </div>
  <div v-else-if="passwordSaved" role="status" class="space-y-3">
    <p>Your password has been saved. You can now sign in with your email and this password.</p>
    <p>Google sign-in remains available if it is linked to your account.</p>
    <p>To try your new password, sign out and sign in again.</p>
    <SignOutButton />
    <RouterLink :to="{ name: routesName.accountOrders }" class="block text-blue-800">
      Back to account
    </RouterLink>
  </div>
  <form
    v-else
    novalidate
    @submit.prevent="form.handleSubmit()"
    class="w-fit flex flex-col space-y-4"
  >
    <p>Set a password for email sign-in. This updates your existing account.</p>
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
    <form.Field name="confirmPassword">
      <template #default="{ field }">
        <BaseInput
          :model-value="field.state.value"
          @update:model-value="field.handleChange"
          @blur="field.handleBlur"
          name="confirmPassword"
          aria-label="Confirm password"
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

    <p v-if="errorMessage" role="alert" class="text-sm text-red-500">{{ errorMessage }}</p>
    <BaseButton
      type="submit"
      :disabled="loading"
      class="w-[167px] h-[54px] flex justify-center items-center bg-purple px-5 py-4 text-white rounded-lg text-18"
    >
      Save password
    </BaseButton>
  </form>
</template>
