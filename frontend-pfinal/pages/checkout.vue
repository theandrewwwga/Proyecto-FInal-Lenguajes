<template>
  <div class="min-h-screen bg-gray-100 dark:bg-gray-900 py-8">
    <div class="max-w-4xl mx-auto px-4">
      <h1 class="text-2xl font-bold text-gray-900 dark:text-white mb-8">
        Finalizar Compra
      </h1>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Formulario de checkout -->
        <div class="lg:col-span-2 space-y-6">
          <!-- Información de envío -->
          <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Información de Envío
            </h2>
            
            <div class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Nombre completo
                </label>
                <input
                  type="text"
                  :value="fullName"
                  disabled
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 text-gray-900 dark:text-white"
                />
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Dirección de envío
                </label>
                <input
                  type="text"
                  v-model="shippingAddress"
                  placeholder="Calle y número"
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600 text-gray-900 dark:text-white"
                />
              </div>
              
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Ciudad
                  </label>
                  <input
                    type="text"
                    v-model="city"
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600 text-gray-900 dark:text-white"
                  />
                </div>
                
                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Estado
                  </label>
                  <input
                    type="text"
                    v-model="state"
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600 text-gray-900 dark:text-white"
                  />
                </div>
              </div>
            </div>
          </div>

          <!-- Método de pago -->
          <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Método de Pago
            </h2>
            
            <p class="text-gray-600 dark:text-gray-400">
              Los métodos de pago se implementarán próximamente
            </p>
          </div>
        </div>

        <!-- Resumen del pedido -->
        <div class="lg:col-span-1">
          <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6 sticky top-4">
            <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Resumen del Pedido
            </h2>
            
            <div class="space-y-3 mb-4">
              <div v-for="item in cartItems" :key="item.id" class="flex justify-between">
                <span class="text-gray-600 dark:text-gray-400">
                  {{ item.product.name }} (x{{ item.quantity }})
                </span>
                <span class="text-gray-900 dark:text-white">
                  ${{ (item.product.price * item.quantity).toFixed(2) }}
                </span>
              </div>
            </div>
            
            <div class="border-t pt-4 space-y-2">
              <div class="flex justify-between">
                <span class="text-gray-600 dark:text-gray-400">Subtotal</span>
                <span class="text-gray-900 dark:text-white">${{ subtotal.toFixed(2) }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600 dark:text-gray-400">Envío</span>
                <span class="text-gray-900 dark:text-white">$10.00</span>
              </div>
              <div class="flex justify-between font-semibold text-lg">
                <span class="text-gray-900 dark:text-white">Total</span>
                <span class="text-gray-900 dark:text-white">${{ total.toFixed(2) }}</span>
              </div>
            </div>
            
            <button
              @click="placeOrder"
              :disabled="isProcessing"
              class="w-full mt-6 px-4 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-400 transition-colors"
            >
              {{ isProcessing ? 'Procesando...' : 'Confirmar Pedido' }}
            </button>
          </div>
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
const cartStore = useCartStore()
const router = useRouter()

// User info
const user = computed(() => authStore.user as User | null)
const fullName = computed(() => {
  if (!user.value) return ''
  const { nombre, apaterno, amaterno } = user.value
  return `${nombre || ''} ${apaterno || ''} ${amaterno || ''}`.trim()
})

// Form data
const shippingAddress = ref(user.value?.direccion || '')
const city = ref(user.value?.ciudad || '')
const state = ref(user.value?.estado || '')

// Cart info
const cartItems = computed(() => cartStore.items)
const subtotal = computed(() => cartStore.totalAmount)
const total = computed(() => subtotal.value + 10) // +10 de envío

// UI state
const isProcessing = ref(false)

// Verificar que hay items en el carrito
onMounted(() => {
  if (cartItems.value.length === 0) {
    router.push('/cart')
  }
})

const placeOrder = async () => {
  isProcessing.value = true
  
  try {
    // TODO: Implementar la creación de la orden en el backend
    // const { $api } = useNuxtApp()
    // const order = await $api('/orders', {
    //   method: 'POST',
    //   body: {
    //     items: cartItems.value,
    //     shippingAddress: {
    //       direccion: shippingAddress.value,
    //       ciudad: city.value,
    //       estado: state.value
    //     },
    //     total: total.value
    //   }
    // })
    
    // Simular proceso de orden
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Limpiar carrito
    cartStore.clearCart()
    
    // Redirigir a página de confirmación
    router.push('/order-success')
  } catch (error) {
    console.error('Error al procesar la orden:', error)
    alert('Error al procesar la orden. Por favor intenta de nuevo.')
  } finally {
    isProcessing.value = false
  }
}
</script>