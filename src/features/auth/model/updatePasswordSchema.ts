import { z } from 'zod'
import { signUpSchema } from './signUpSchema'

const updatePasswordSchema = signUpSchema
  .pick({
    password: true,
  })
  .extend({
    confirmPassword: z.string().min(6, 'Минимум 6 символов').trim(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Пароли не совпадают',
    path: ['confirmPassword'],
  })

type UpdatePasswordPayload = z.infer<typeof updatePasswordSchema>

export { updatePasswordSchema, type UpdatePasswordPayload }
