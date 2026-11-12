const authErrorMessages: Readonly<Record<string, string>> = {
  invalid_credentials:
    'Email or password is incorrect. If you signed up with Google, continue with Google or reset your password.',
  user_already_exists:
    'An account with this email already exists. Sign in, continue with Google, or reset your password.',
  email_exists:
    'An account with this email already exists. Sign in, continue with Google, or reset your password.',
  email_not_confirmed: 'Please confirm your email before signing in.',
  weak_password: 'Choose a stronger password and try again.',
  same_password: 'Choose a password different from your current password.',
  over_email_send_rate_limit: 'Too many emails requested. Please wait before trying again.',
  over_request_rate_limit: 'Too many attempts. Please wait before trying again.',
  otp_expired:
    'This link has expired or has already been used. Request a new password reset email.',
  session_not_found:
    'Your session has expired. Sign in again or request a new password reset email.',
  session_expired: 'Your session has expired. Sign in again or request a new password reset email.',
  reauthentication_needed: 'Please sign in again before changing your password.',
}

const getAuthErrorMessage = (error: unknown): string => {
  if (typeof error === 'object' && error !== null && 'code' in error) {
    const code = error.code
    if (typeof code === 'string' && Object.hasOwn(authErrorMessages, code)) {
      return authErrorMessages[code] ?? 'We could not complete this action. Please try again.'
    }
  }

  return 'We could not complete this action. Check your connection and try again.'
}

export { getAuthErrorMessage }
