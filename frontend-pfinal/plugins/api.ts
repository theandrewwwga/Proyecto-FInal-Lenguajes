export default defineNuxtPlugin(() => {
    const config = useRuntimeConfig()
    
    const api = $fetch.create({
      baseURL: config.public.apiBase || 'http://localhost:5050/api',
      onRequest({ options }) {
        const token = useCookie('auth-token').value
        
        if (token) {
          const headers = new Headers(options.headers || {})
          headers.set('Authorization', `Bearer ${token}`)
          options.headers = headers
        }
      },
      onResponseError({ response }) {
        if (response.status === 401) {
          const router = useRouter()
          const authStore = useAuthStore()
          authStore.logout()
          router.push('/login')
        }
      }
    })
  
    return {
      provide: {
        api
      }
    }
  })