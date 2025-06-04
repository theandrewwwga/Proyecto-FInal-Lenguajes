export const useApi = () => {
    const config = useRuntimeConfig()
    
    const apiCall = async (endpoint: string, options: any = {}) => {
      return await $fetch(`${config.public.apiBase}${endpoint}`, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...options.headers
        }
      })
    }
  
    return { apiCall }
  }