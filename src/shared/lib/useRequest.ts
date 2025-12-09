import { ref } from 'vue'
import { extractErrorMessage } from '@shared/lib'

const useRequest = () => {
  const loading = ref(false)
  const errorMessage = ref('')

  const handleRequest = async <T>(fn: () => Promise<T>) => {
    errorMessage.value = ''
    loading.value = true
    try {
      return await fn()
    } catch (error: unknown) {
      errorMessage.value = extractErrorMessage(error)

      throw error
    } finally {
      loading.value = false
    }
  }

  return { loading, errorMessage, handleRequest }
}

export { useRequest }
