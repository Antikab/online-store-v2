import { ref } from 'vue'
import { extractErrorMessage } from './extractErrorMessage'

const useRequest = (getErrorMessage: (error: unknown) => string = extractErrorMessage) => {
  const loading = ref(false)
  const errorMessage = ref('')

  const handleRequest = async <T>(fn: () => Promise<T>) => {
    errorMessage.value = ''
    loading.value = true
    try {
      return await fn()
    } catch (error: unknown) {
      errorMessage.value = getErrorMessage(error)

      throw error
    } finally {
      loading.value = false
    }
  }

  return { loading, errorMessage, handleRequest }
}

export { useRequest }
