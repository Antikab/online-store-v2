import { type SignUpPayload, type SignInPayload } from '@features/auth/model'
import { routesPath } from '@shared/config'
import { supabase } from '@shared/config'
import { useRequest } from '@shared/lib'

const useAuth = () => {
  const { loading, errorMessage, handleRequest } = useRequest()

  const signUp = async ({ email, password, firstName }: SignUpPayload) => {
    return await handleRequest(async () => {
      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
      })
      if (signUpError) throw signUpError

      const userId = data.user?.id
      if (!userId) throw new Error('User id is missing after signUp')

      const { error: updateError } = await supabase
        .from('auth_users')
        .update({ name: firstName })
        .eq('id', userId)
      if (updateError) throw updateError
      return data
    })
  }

  const signIn = async ({ email, password }: SignInPayload) => {
    return await handleRequest(async () => {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      if (error) throw error
      return data
    })
  }

  const signOut = async () => {
    return await handleRequest(async () => {
      const { error } = await supabase.auth.signOut()
      if (error) throw error
    })
  }

  const signInWithGoogle = async () => {
    return await handleRequest(async () => {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: window.location.origin,
        },
      })
      if (error) throw error
      return data
    })
  }

  const updatePassword = async (password: string) => {
    return await handleRequest(async () => {
      const { data, error } = await supabase.auth.updateUser({ password })
      if (error) throw error
      return data
    })
  }

  const resetPassword = async (email: string) => {
    return await handleRequest(async () => {
      const origin = window.location.origin
      const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${origin}${routesPath.updatePassword}`,
      })
      if (error) throw error
      return data
    })
  }

  return {
    signUp,
    signIn,
    signInWithGoogle,
    signOut,
    updatePassword,
    resetPassword,
    loading,
    errorMessage,
  }
}

export { useAuth }
