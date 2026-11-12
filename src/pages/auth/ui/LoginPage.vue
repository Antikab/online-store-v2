<script setup lang="ts">
import { useForm } from '@tanstack/vue-form'
import { useRouter } from 'vue-router'

import { useAuth, signInSchema, GoogleAuthButton } from '@/features/auth'
import { routesName } from '@/shared/config'
import { BaseButton, BaseInput } from '@/shared/ui'

const router = useRouter()

const { signIn, loading, errorMessage } = useAuth()

const form = useForm({
  defaultValues: {
    email: '',
    password: '',
  },
  validators: {
    onChange: signInSchema,
    onBlur: signInSchema,
    onSubmit: signInSchema,
  },
  onSubmit: async ({ value }) => {
    try {
      await signIn(signInSchema.parse(value))
    } catch {
      // Ошибка запроса уже сохранена в errorMessage.
      return
    }
    await router.replace({ name: routesName.home })
  },
})

const hasSubmitted = form.useSelector((state) => state.submissionAttempts > 0)
</script>

<template>
  <h1>Sign in</h1>
  <form novalidate @submit.prevent="form.handleSubmit()" class="w-fit flex flex-col space-y-4">
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
            'ring-red-300':
              (field.state.meta.isBlurred || hasSubmitted) && field.state.meta.errors.length > 0,
          }"
        />
        <p
          v-if="(field.state.meta.isBlurred || hasSubmitted) && field.state.meta.errors.length > 0"
          class="text-sm text-red-500"
        >
          {{ field.state.meta.errors[0]?.message }}
        </p>
      </template>
    </form.Field>

    <form.Field name="password">
      <template #default="{ field }">
        <div class="flex justify-center items-end gap-2">
          <BaseInput
            :model-value="field.state.value"
            @update:model-value="field.handleChange"
            @blur="field.handleBlur"
            name="password"
            aria-label="Password"
            type="password"
            autocomplete="current-password"
            placeholder="Harry934PotteR"
            class="border rounded-lg px-3 py-2"
            :class="{
              'ring-red-300':
                (field.state.meta.isBlurred || hasSubmitted) && field.state.meta.errors.length > 0,
            }"
          />
          <RouterLink :to="{ name: routesName.resetPassword }" class="text-blue-800">
            Forgot password?
          </RouterLink>
        </div>
        <p
          v-if="(field.state.meta.isBlurred || hasSubmitted) && field.state.meta.errors.length > 0"
          class="text-sm text-red-500"
        >
          {{ field.state.meta.errors[0]?.message }}
        </p>
      </template>
    </form.Field>

    <p v-if="errorMessage" role="alert" class="text-sm text-red-500">{{ errorMessage }}</p>
    <p class="text-sm text-gray/70">
      Signed up with Google? Continue with Google. To use a password, sign in with Google and set
      one from your account, or use Forgot password.
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
