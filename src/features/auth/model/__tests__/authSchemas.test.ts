import { describe, expect, it } from 'vitest'
import { FieldApi, FormApi } from '@tanstack/vue-form'

import { signInSchema } from '../signInSchema'
import { signUpSchema } from '../signUpSchema'
import { resetPasswordSchema } from '../resetPasswordSchema'
import { updatePasswordSchema } from '../updatePasswordSchema'

describe('auth schemas', () => {
  it('normalizes email consistently for registration, login and password reset', () => {
    const input = { email: '  User@Example.COM  ', password: 'Secret123', firstName: 'Alex' }

    expect(signUpSchema.parse(input).email).toBe('user@example.com')
    expect(signInSchema.parse(input).email).toBe('user@example.com')
    expect(resetPasswordSchema.parse(input).email).toBe('user@example.com')
    expect(input.email).toBe('  User@Example.COM  ')
  })

  it.each(['', '   ', 'not-an-email'])('rejects invalid email %j', (email) => {
    expect(resetPasswordSchema.safeParse({ email }).success).toBe(false)
  })

  it('trims the name before checking whether it is empty', () => {
    const input = { email: 'user@example.com', password: 'Secret123', firstName: '   ' }

    expect(signUpSchema.safeParse(input).success).toBe(false)
    expect(signUpSchema.parse({ ...input, firstName: '  Alex  ' }).firstName).toBe('Alex')
  })

  it('preserves spaces and case in passwords', () => {
    const password = '  Secret123  '
    const input = { email: 'user@example.com', password, firstName: 'Alex' }

    expect(signUpSchema.parse(input).password).toBe(password)
    expect(signInSchema.parse(input).password).toBe(password)
    expect(updatePasswordSchema.parse({ password, confirmPassword: password }).password).toBe(
      password,
    )
  })

  it('compares the actual passwords including their spaces', () => {
    const result = updatePasswordSchema.safeParse({
      password: ' Secret123 ',
      confirmPassword: 'Secret123',
    })

    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.issues).toContainEqual(
        expect.objectContaining({ path: ['confirmPassword'], message: 'Пароли не совпадают' }),
      )
    }
  })
})

describe('TanStack Form and Zod integration', () => {
  it('blocks invalid login and supplies the parsed payload after correction', async () => {
    const submitted: ReturnType<typeof signInSchema.parse>[] = []
    const form = new FormApi({
      defaultValues: { email: '', password: '' },
      validators: { onChange: signInSchema, onSubmit: signInSchema },
      onSubmit: ({ value }) => {
        submitted.push(signInSchema.parse(value))
      },
    })
    const unmount = form.mount()
    const emailField = new FieldApi({ form, name: 'email' })
    const passwordField = new FieldApi({ form, name: 'password' })
    const unmountEmail = emailField.mount()
    const unmountPassword = passwordField.mount()

    try {
      await form.handleSubmit()
      expect(submitted).toHaveLength(0)
      expect(form.getAllErrors().fields.email?.errors).not.toHaveLength(0)
      expect(form.getAllErrors().fields.password?.errors).not.toHaveLength(0)

      emailField.handleChange('  User@Example.COM  ')
      passwordField.handleChange(' Secret123 ')
      await form.handleSubmit()

      expect(submitted).toEqual([{ email: 'user@example.com', password: ' Secret123 ' }])
      expect(form.state.values.email).toBe('  User@Example.COM  ')
      expect(form.state.isSubmitting).toBe(false)
    } finally {
      unmountPassword()
      unmountEmail()
      unmount()
    }
  })

  it('reports a password mismatch on the confirmation field and clears it after correction', async () => {
    let submissions = 0
    const form = new FormApi({
      defaultValues: { password: 'Secret123', confirmPassword: 'Different123' },
      validators: { onChange: updatePasswordSchema, onSubmit: updatePasswordSchema },
      onSubmit: () => {
        submissions += 1
      },
    })
    const unmount = form.mount()
    const passwordField = new FieldApi({ form, name: 'password' })
    const confirmPasswordField = new FieldApi({ form, name: 'confirmPassword' })
    const unmountPassword = passwordField.mount()
    const unmountConfirmation = confirmPasswordField.mount()

    try {
      await form.handleSubmit()
      expect(submissions).toBe(0)
      expect(form.getAllErrors().fields.confirmPassword?.errors).toContainEqual(
        expect.objectContaining({ message: 'Пароли не совпадают' }),
      )

      confirmPasswordField.handleChange('Secret123')
      await form.handleSubmit()

      expect(submissions).toBe(1)
      expect(form.getAllErrors().fields.confirmPassword).toBeUndefined()
    } finally {
      unmountConfirmation()
      unmountPassword()
      unmount()
    }
  })

  it('reports required field errors for an empty password update form', async () => {
    const form = new FormApi({
      defaultValues: { password: '', confirmPassword: '' },
      validators: { onSubmit: updatePasswordSchema },
    })
    const unmount = form.mount()

    try {
      await form.handleSubmit()
      expect(form.getAllErrors().fields.password?.errors).not.toHaveLength(0)
      expect(form.getAllErrors().fields.confirmPassword?.errors).not.toHaveLength(0)
    } finally {
      unmount()
    }
  })
})
