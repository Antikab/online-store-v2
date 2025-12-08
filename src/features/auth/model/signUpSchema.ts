import { z } from 'zod'

const signUpSchema = z.object({
  email: z.email('Введите корректный e-mail').trim().toLowerCase(),
  password: z.string().min(6, 'Минимум 6 символов').trim(),
  firstName: z.string().min(1, 'Имя обязательно').trim().toLowerCase(),
})

type SignUpPayload = z.infer<typeof signUpSchema>

export { signUpSchema, type SignUpPayload }
