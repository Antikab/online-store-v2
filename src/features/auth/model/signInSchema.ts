import { z } from 'zod'
import { signUpSchema } from './signUpSchema'

const signInSchema = signUpSchema.pick({
  email: true,
  password: true,
})

type SignInPayload = z.infer<typeof signInSchema>

export { signInSchema, type SignInPayload }
