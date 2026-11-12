import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

const auth = vi.hoisted(() => ({
  signUp: vi.fn(),
  signInWithPassword: vi.fn(),
  updateUser: vi.fn(),
  resetPasswordForEmail: vi.fn(),
}))

vi.mock('@shared/api', () => ({ supabase: { auth } }))
vi.mock('@shared/config', () => ({ routesPath: { updatePassword: '/update-password' } }))

import { useAuth } from '../useAuth'

beforeEach(() => {
  vi.resetAllMocks()
  vi.stubGlobal('window', { location: { origin: 'http://localhost:5173' } })
})

afterEach(() => {
  vi.unstubAllGlobals()
})

describe('auth API', () => {
  it('passes the name to the existing profile trigger during signup', async () => {
    auth.signUp.mockResolvedValue({ data: { user: { id: 'user-1' }, session: null }, error: null })
    const request = useAuth()

    const result = await request.signUp({
      email: 'user@example.com',
      password: 'Secret123',
      firstName: 'Alex',
    })

    expect(auth.signUp).toHaveBeenCalledWith({
      email: 'user@example.com',
      password: 'Secret123',
      options: { data: { name: 'Alex' } },
    })
    expect(result.session).toBeNull()
  })

  it('keeps a safe login error and resets loading after failure', async () => {
    const error = { code: 'invalid_credentials', message: 'internal detail' }
    auth.signInWithPassword.mockResolvedValue({ data: null, error })
    const request = useAuth()

    await expect(request.signIn({ email: 'user@example.com', password: 'Secret123' })).rejects.toBe(
      error,
    )

    expect(request.loading.value).toBe(false)
    expect(request.errorMessage.value).toContain('continue with Google')
    expect(request.errorMessage.value).not.toContain('internal detail')
  })

  it('sets the password on the current account without creating a new user', async () => {
    auth.updateUser.mockResolvedValue({ data: { user: { id: 'user-1' } }, error: null })
    const request = useAuth()

    await request.updatePassword(' Secret123 ')

    expect(auth.updateUser).toHaveBeenCalledWith({ password: ' Secret123 ' })
    expect(auth.signUp).not.toHaveBeenCalled()
  })

  it('sends the recovery link to the existing password page', async () => {
    auth.resetPasswordForEmail.mockResolvedValue({ data: {}, error: null })
    const request = useAuth()

    await request.resetPassword('user@example.com')

    expect(auth.resetPasswordForEmail).toHaveBeenCalledWith('user@example.com', {
      redirectTo: 'http://localhost:5173/update-password',
    })
  })

  it('clears the previous error on a successful retry', async () => {
    auth.updateUser
      .mockResolvedValueOnce({ data: null, error: { code: 'weak_password' } })
      .mockResolvedValueOnce({ data: { user: { id: 'user-1' } }, error: null })
    const request = useAuth()

    await expect(request.updatePassword('weak')).rejects.toEqual({ code: 'weak_password' })
    await request.updatePassword('Secret123')

    expect(request.errorMessage.value).toBe('')
    expect(request.loading.value).toBe(false)
  })
})
