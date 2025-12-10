<script setup lang="ts">
import { onMounted } from 'vue'
import { toTypedSchema } from '@vee-validate/zod'
import { useForm, useField } from 'vee-validate'

import { useAuth, updatePasswordSchema } from '@/features/auth'
import { clearAuthHash } from '@/shared/lib'
import { BaseButton } from '@/shared/ui'

const { handleSubmit } = useForm({
  validationSchema: toTypedSchema(updatePasswordSchema),
  initialValues: {
    password: '',
    confirmPassword: '',
  },
})

const { value: password, errorMessage: passwordError, meta: passwordMeta } = useField('password')
const {
  value: confirmPassword,
  errorMessage: confirmPasswordError,
  meta: confirmPasswordMeta,
} = useField('confirmPassword')

const { updatePassword } = useAuth()

const submitForm = handleSubmit(async ({ password }) => {
  await updatePassword(password)
})

onMounted(() => {
  clearAuthHash()
})
</script>

<template>
  <div>Создать новый пароль</div>
  <form @submit.prevent="submitForm" class="w-fit flex flex-col space-y-4">
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
      v-model="confirmPassword"
      @blur="confirmPasswordMeta.touched = true"
      type="password"
      placeholder="Harry934PotteR"
      class="border rounded-lg px-3 py-2"
      :class="{ 'ring-red-300': confirmPasswordMeta.touched && confirmPasswordError }"
    />
    <p v-if="confirmPasswordMeta.touched && confirmPasswordError" class="text-sm text-red-500">
      {{ confirmPasswordError }}
    </p>

    <BaseButton
      class="w-[167px] h-[54px] flex justify-center items-center bg-purple px-5 py-4 text-white rounded-lg text-18"
    >
      Reset password
    </BaseButton>
  </form>
</template>
