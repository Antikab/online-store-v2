import { z } from 'zod'
import { signUpSchema } from './signUpSchema'

const createPasswordSchema = signUpSchema
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

type CreatePasswordPayload = z.infer<typeof createPasswordSchema>

export { createPasswordSchema, type CreatePasswordPayload }
