import { z } from 'zod'

const signUpSchema = z.object({
  email: z
    .string()
    .trim()
    .toLowerCase()
    .min(1, 'Email обязателен')
    .pipe(z.email('Введите корректный e-mail')),
  password: z.string().min(6, 'Минимум 6 символов').trim(),
  firstName: z.string().min(1, 'Имя обязательно').trim(),
})

type SignUpPayload = z.infer<typeof signUpSchema>

export { signUpSchema, type SignUpPayload }
