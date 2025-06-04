<template>
    <div class="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div class="text-center">
        <div class="mb-8">
          <svg class="mx-auto h-24 w-24 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
          </svg>
        </div>
        
        <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          403 - Acceso Denegado
        </h1>
        
        <p class="text-xl text-gray-600 dark:text-gray-400 mb-8">
          No tienes permisos para acceder a esta página.
        </p>
        
        <div class="space-x-4">
          <button
            @click="goBack"
            class="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            Volver
          </button>
          
          <NuxtLink
            to="/"
            class="inline-block px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Ir al Inicio
          </NuxtLink>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  const router = useRouter()
  
  const goBack = () => {
    router.back()
  }
  </script>