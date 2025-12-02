import { supabase } from '@shared/config'
import { useRequest } from '@shared/lib'

type SignUpPayload = {
  email: string
  password: string
  firstName: string
}

// type SignInPayload = {
//   email: string
//   password: string
// }

function useAuth() {
  const { loading, errorMessage, handleRequest } = useRequest()
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
      return data
    })
  }

  // const signIn = async ({ email, password }: SignInPayload) => {
  //   return await handleRequest(async () => {
  //     const { data, error } = await supabase.auth.signInWithPassword({
  //       email,
  //       password,
  //     })
  //     if (error) throw error
  //     return data
  //   })
  // }

  // const resetPassword = async (email: string) => {
  //   return await handleRequest(async () => {
  //     const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
  //       redirectTo: 'http://localhost:5173/reset-password',
  //     })
  //     if (error) throw error
  //     return data
  //   })
  // }

  // const updatePassword = async (password: string) => {
  //   return await handleRequest(async () => {
  //     const { data, error } = await supabase.auth.updateUser({ password })
  //     if (error) throw error
  //     return data
  //   })
  // }

  return { signUp, loading, errorMessage }
}

export { useAuth }
