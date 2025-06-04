<template>
  <div class="min-h-screen bg-gray-100 dark:bg-gray-900 py-8">
    <div class="max-w-4xl mx-auto px-4">
      <!-- Header -->
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
        <h1 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Mi Perfil
        </h1>
        <p class="text-gray-600 dark:text-gray-400">
          Administra tu información personal y configuración
        </p>
      </div>

      <!-- Información del Usuario -->
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
        <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Información Personal
        </h2>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Nombre completo
            </label>
            <p class="text-gray-900 dark:text-white">
              {{ fullName }}
            </p>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Email
            </label>
            <p class="text-gray-900 dark:text-white">
              {{ user?.email }}
            </p>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Teléfono
            </label>
            <p class="text-gray-900 dark:text-white">
              {{ user?.telefono || 'No especificado' }}
            </p>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Rol
            </label>
            <p class="text-gray-900 dark:text-white capitalize">
              {{ user?.rol || 'usuario' }}
            </p>
          </div>
        </div>
      </div>

      <!-- Dirección -->
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
        <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Dirección
        </h2>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="md:col-span-2">
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Dirección
            </label>
            <p class="text-gray-900 dark:text-white">
              {{ user?.direccion || 'No especificada' }}
            </p>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Ciudad
            </label>
            <p class="text-gray-900 dark:text-white">
              {{ user?.ciudad || 'No especificada' }}
            </p>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Estado
            </label>
            <p class="text-gray-900 dark:text-white">
              {{ user?.estado || 'No especificado' }}
            </p>
          </div>
        </div>
      </div>

      <!-- Acciones -->
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Acciones
        </h2>
        
        <div class="space-y-3">
          <button
            @click="editProfile"
            class="w-full md:w-auto px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Editar Perfil
          </button>
          
          <button
            @click="changePassword"
            class="w-full md:w-auto px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors ml-0 md:ml-3"
          >
            Cambiar Contraseña
          </button>
          
          <button
            @click="viewOrders"
            class="w-full md:w-auto px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors ml-0 md:ml-3"
          >
            Ver Mis Pedidos
          </button>
          
          <button
            @click="logout"
            class="w-full md:w-auto px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors ml-0 md:ml-3"
          >
            Cerrar Sesión
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { User } from '~/types/user'

// Aplicar middleware de autenticación
definePageMeta({
  middleware: 'auth'
})

const authStore = useAuthStore()
const router = useRouter()

const user = computed(() => authStore.user as User | null)

const fullName = computed(() => {
  if (!user.value) return 'Usuario'
  const { nombre, apaterno, amaterno } = user.value
  return `${nombre || ''} ${apaterno || ''} ${amaterno || ''}`.trim()
})

const editProfile = () => {
  // TODO: Implementar edición de perfil
  alert('Función de editar perfil próximamente')
}

const changePassword = () => {
  // TODO: Implementar cambio de contraseña
  alert('Función de cambiar contraseña próximamente')
}

const viewOrders = () => {
  router.push('/orders')
}

const logout = async () => {
  await authStore.logout()
  router.push('/')
}
</script>