// frontend/middleware/guest.ts
export default defineNuxtRouteMiddleware((to, from) => {
    const authStore = useAuthStore()
    
    // Si ya está autenticado, redirigir al inicio
    if (authStore.isAuthenticated) {
      return navigateTo('/')
    }
  })