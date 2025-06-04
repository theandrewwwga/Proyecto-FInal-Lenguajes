// frontend/middleware/auth.ts
export default defineNuxtRouteMiddleware((to, from) => {
  const authStore = useAuthStore()
  
  // Si no está autenticado, redirigir al login
  if (!authStore.isAuthenticated) {
    // Guardar la ruta a la que intentaba acceder
    const loginRoute = '/login?redirect=' + encodeURIComponent(to.fullPath)
    return navigateTo(loginRoute)
  }
})