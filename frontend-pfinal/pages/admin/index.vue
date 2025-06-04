<template>
    <div class="min-h-screen bg-gray-100 dark:bg-gray-900">
      <!-- Header -->
      <div class="bg-white dark:bg-gray-800 shadow">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex justify-between items-center py-6">
            <h1 class="text-2xl font-bold text-gray-900 dark:text-white">
              Panel de Administración
            </h1>
            <button
              @click="logout"
              class="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
            >
              Cerrar Sesión
            </button>
          </div>
        </div>
      </div>
  
      <!-- Content -->
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <!-- Stats -->
        <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <div class="flex items-center">
              <div class="p-3 bg-blue-500 rounded-full">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path>
                </svg>
              </div>
              <div class="ml-4">
                <p class="text-sm text-gray-500 dark:text-gray-400">Usuarios</p>
                <p class="text-2xl font-semibold text-gray-900 dark:text-white">{{ stats.users }}</p>
              </div>
            </div>
          </div>
  
          <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <div class="flex items-center">
              <div class="p-3 bg-green-500 rounded-full">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
                </svg>
              </div>
              <div class="ml-4">
                <p class="text-sm text-gray-500 dark:text-gray-400">Productos</p>
                <p class="text-2xl font-semibold text-gray-900 dark:text-white">{{ stats.products }}</p>
              </div>
            </div>
          </div>
  
          <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <div class="flex items-center">
              <div class="p-3 bg-yellow-500 rounded-full">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
                </svg>
              </div>
              <div class="ml-4">
                <p class="text-sm text-gray-500 dark:text-gray-400">Órdenes</p>
                <p class="text-2xl font-semibold text-gray-900 dark:text-white">{{ stats.orders }}</p>
              </div>
            </div>
          </div>
  
          <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <div class="flex items-center">
              <div class="p-3 bg-purple-500 rounded-full">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <div class="ml-4">
                <p class="text-sm text-gray-500 dark:text-gray-400">Ingresos</p>
                <p class="text-2xl font-semibold text-gray-900 dark:text-white">${{ stats.revenue }}</p>
              </div>
            </div>
          </div>
        </div>
  
        <!-- Quick Actions -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <NuxtLink
            to="/admin/products"
            class="bg-white dark:bg-gray-800 rounded-lg shadow p-6 hover:shadow-lg transition-shadow"
          >
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Gestionar Productos
            </h3>
            <p class="text-gray-600 dark:text-gray-400">
              Agregar, editar o eliminar productos del catálogo
            </p>
          </NuxtLink>
  
          <NuxtLink
            to="/admin/orders"
            class="bg-white dark:bg-gray-800 rounded-lg shadow p-6 hover:shadow-lg transition-shadow"
          >
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Ver Órdenes
            </h3>
            <p class="text-gray-600 dark:text-gray-400">
              Revisar y gestionar las órdenes de los clientes
            </p>
          </NuxtLink>
  
          <NuxtLink
            to="/admin/users"
            class="bg-white dark:bg-gray-800 rounded-lg shadow p-6 hover:shadow-lg transition-shadow"
          >
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Gestionar Usuarios
            </h3>
            <p class="text-gray-600 dark:text-gray-400">
              Administrar usuarios y permisos
            </p>
          </NuxtLink>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  // Aplicar middleware de administrador
  definePageMeta({
    middleware: 'admin',
    layout: false // Usar layout completo sin navegación del sitio
  })
  
  const authStore = useAuthStore()
  const router = useRouter()
  
  // Estadísticas simuladas (en producción vendrían del backend)
  const stats = ref({
    users: 156,
    products: 89,
    orders: 234,
    revenue: 15420
  })
  
  const logout = async () => {
    await authStore.logout()
    router.push('/')
  }
  
  // En producción, cargar estadísticas reales
  onMounted(async () => {
    // TODO: Cargar estadísticas desde el backend
    // const { data } = await $fetch('/api/admin/stats')
    // stats.value = data
  })
  </script>