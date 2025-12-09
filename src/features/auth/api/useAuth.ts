import { useRouter } from 'vue-router'

import { type SignUpPayload, type SignInPayload } from '@features/auth/model'
import { routesPath, routesName } from '@shared/config/router'
import { supabase } from '@shared/config/supabase'
import { useRequest } from '@shared/lib'

const useAuth = () => {
  const { loading, errorMessage, handleRequest } = useRequest()
  const router = useRouter()

  const signUp = async ({ email, password, firstName }: SignUpPayload) => {
    return await handleRequest(async () => {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      })
      if (error) throw error

      const { error: insertError } = await supabase
        .from('authUsers')
        .insert([{ id: data.user?.id, email, name: firstName }])
      if (insertError) throw insertError

      router.replace({ name: routesName.home })
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

      router.replace({ name: routesName.home })
      return data
    })
  }

  const signOut = async () => {
    return await handleRequest(async () => {
      const { error } = await supabase.auth.signOut()
      if (error) throw error

      router.replace({ name: routesName.login })
    })
  }

  const updatePassword = async (password: string) => {
    return await handleRequest(async () => {
      const { data, error } = await supabase.auth.updateUser({ password })
      if (error) throw error

      await signOut()
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

  return { signUp, signIn, signOut, updatePassword, resetPassword, loading, errorMessage }
}

export { useAuth }
