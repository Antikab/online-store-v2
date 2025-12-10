<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import { useForm, useField } from 'vee-validate'

import { resetPasswordSchema } from '@/features/auth/model'
import { useAuth } from '@/features/auth/api'
import { BaseButton } from '@/shared/ui'

const { handleSubmit } = useForm({
  validationSchema: toTypedSchema(resetPasswordSchema),
  initialValues: {
    email: '',
  },
})

const { value: email, errorMessage: emailError, meta: emailMeta } = useField('email')

const { resetPassword } = useAuth()

const submitForm = handleSubmit(async ({ email }) => {
  await resetPassword(email)
})
</script>

<template>
  <div>Ввести email для сброса пароля</div>
  <form @submit.prevent="submitForm" class="w-fit flex flex-col space-y-4">
    <input
      v-model="email"
      @blur="emailMeta.touched = true"
      type="email"
      placeholder="designer@gmail.com"
      class="border rounded-lg px-3 py-2"
      :class="{ 'ring-red-300': emailMeta.touched && emailError }"
    />
    <p v-if="emailMeta.touched && emailError" class="text-sm text-red-500">
      {{ emailError }}
    </p>

    <BaseButton
      class="h-[54px] flex justify-center items-center bg-purple px-5 py-4 text-white rounded-lg text-18"
    >
      Reset password
    </BaseButton>
  </form>
</template>
