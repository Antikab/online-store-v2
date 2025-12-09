import { z } from 'zod'
import { signUpSchema } from './signUpSchema'

const resetPasswordSchema = signUpSchema.pick({
  email: true,
})

type ResetPasswordPayload = z.infer<typeof resetPasswordSchema>

export { resetPasswordSchema, type ResetPasswordPayload }
