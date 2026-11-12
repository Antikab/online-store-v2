import { describe, expect, it } from 'vitest'

import { getAuthErrorMessage } from '../getAuthErrorMessage'

describe('auth error messages', () => {
  it('offers Google sign-in and password recovery without claiming which provider the user has', () => {
    const message = getAuthErrorMessage({ code: 'invalid_credentials' })

    expect(message).toContain('If you signed up with Google')
    expect(message).toContain('reset your password')
  })

  it('offers ways to access an existing account after a duplicate registration', () => {
    const message = getAuthErrorMessage({ code: 'user_already_exists' })

    expect(message).toContain('Sign in')
    expect(message).toContain('Google')
    expect(message).toContain('reset your password')
  })

  it.each([
    new Error('secret backend detail'),
    null,
    'secret',
    { code: 'new_server_code' },
    { code: 'toString' },
  ])('does not expose unknown error details: %j', (error) => {
    expect(getAuthErrorMessage(error)).toBe(
      'We could not complete this action. Check your connection and try again.',
    )
  })
})
