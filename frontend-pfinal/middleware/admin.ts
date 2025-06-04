// frontend/middleware/admin.ts
export default defineNuxtRouteMiddleware((to, from) => {
    const authStore = useAuthStore()
    
    // Verificar si está autenticado
    if (!authStore.isAuthenticated) {
      return navigateTo('/login?redirect=' + encodeURIComponent(to.fullPath))
    }
    
    // Verificar si es administrador usando el computed del store
    if (!authStore.isAdmin) {
      // Mostrar error y redirigir
      throw createError({
        statusCode: 403,
        statusMessage: 'No tienes permisos para acceder a esta página'
      })
    }
  })