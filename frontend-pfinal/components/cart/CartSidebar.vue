<template>
  <Teleport to="body">
    <!-- Overlay -->
    <transition
      enter-active-class="transition ease-out duration-200"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition ease-in duration-150"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div 
        v-if="isOpen" 
        class="fixed inset-0 bg-black bg-opacity-25 z-40"
        @click="close"
      ></div>
    </transition>

    <!-- Cart Sidebar -->
    <transition
      enter-active-class="transition ease-out duration-300"
      enter-from-class="translate-x-full"
      enter-to-class="translate-x-0"
      leave-active-class="transition ease-in duration-200"
      leave-from-class="translate-x-0"
      leave-to-class="translate-x-full"
    >
      <div 
        v-if="isOpen"
        class="fixed right-0 top-0 h-full w-full max-w-[420px] bg-white shadow-2xl z-50 flex flex-col"
      >
        <!-- Header -->
        <div class="flex items-center justify-between px-6 py-5 border-b">
          <h2 class="text-2xl font-medium text-gray-900">Cart</h2>
          <button 
            @click="close"
            class="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
          >
            <Icon name="material-symbols:close" class="w-5 h-5 text-gray-600" />
          </button>
        </div>

        <!-- Cart Items -->
        <div class="flex-1 overflow-y-auto">
          <div v-if="items.length === 0" class="p-6 text-center">
            <Icon name="material-symbols:shopping-bag-outline" class="w-24 h-24 text-gray-300 mx-auto mb-4" />
            <p class="text-gray-500 mb-4">Your cart is empty</p>
            <button 
              @click="close"
              class="btn btn-primary"
            >
              Continue Shopping
            </button>
          </div>

          <div v-else class="p-6 space-y-5">
            <div 
              v-for="item in items" 
              :key="item.id"
              class="flex items-start gap-4"
            >
              <!-- Product Image -->
              <div class="w-20 h-20 bg-gray-50 rounded-lg overflow-hidden flex-shrink-0">
                <img 
                  :src="item.product.image" 
                  :alt="item.product.name"
                  class="w-full h-full object-cover"
                >
              </div>

              <!-- Product Details -->
              <div class="flex-1 min-w-0">
                <div class="flex items-start justify-between mb-2">
                  <div>
                    <h3 class="font-medium text-gray-900 text-base">{{ item.product.name }}</h3>
                  </div>
                  <button 
                    @click="removeItem(item.id)"
                    class="p-1 hover:bg-gray-100 rounded transition-colors duration-200 ml-2"
                  >
                    <Icon name="material-symbols:close" class="w-4 h-4 text-gray-400" />
                  </button>
                </div>
                
                <!-- Quantity and Price -->
                <div class="flex items-center justify-between">
                  <!-- Quantity Controls -->
                  <div class="flex items-center border border-gray-300 rounded-lg">
                    <button 
                      @click="updateQuantity(item.id, item.quantity - 1)"
                      class="px-3 py-1 hover:bg-gray-100 transition-colors duration-200"
                      :disabled="item.quantity <= 1"
                    >
                      <Icon name="material-symbols:remove" class="w-4 h-4 text-gray-600" />
                    </button>
                    <span class="px-3 py-1 text-sm font-medium min-w-[40px] text-center">{{ item.quantity }}</span>
                    <button 
                      @click="updateQuantity(item.id, item.quantity + 1)"
                      class="px-3 py-1 hover:bg-gray-100 transition-colors duration-200"
                    >
                      <Icon name="material-symbols:add" class="w-4 h-4 text-gray-600" />
                    </button>
                  </div>
                  <!-- Price -->
                  <span class="font-medium text-gray-900">${{ (item.product.price * item.quantity).toFixed(2) }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Footer -->
        <div v-if="items.length > 0" class="border-t bg-gray-50">
          <div class="p-6 space-y-4">
            <!-- Subtotal -->
            <div class="flex items-center justify-between text-sm">
              <span class="text-gray-600">Subtotal</span>
              <span class="font-medium text-gray-900">${{ totalPrice.toFixed(2) }}</span>
            </div>

            <!-- Total -->
            <div class="flex items-center justify-between pt-3 border-t">
              <span class="text-lg font-medium text-gray-900">Total</span>
              <span class="text-xl font-semibold text-gray-900">${{ totalPrice.toFixed(2) }}</span>
            </div>

            <!-- Free Shipping Notice -->
            <div v-if="totalPrice < 99" class="bg-blue-50 rounded-lg p-3 text-sm">
              <p class="text-blue-800">
                Add <span class="font-semibold">${{ (99 - totalPrice).toFixed(2) }}</span> more for free shipping
              </p>
            </div>
            <div v-else class="bg-green-50 rounded-lg p-3 text-sm">
              <p class="text-green-800 font-medium flex items-center">
                <Icon name="material-symbols:check-circle" class="w-4 h-4 mr-1" />
                Free shipping unlocked!
              </p>
            </div>

            <!-- Action Buttons -->
            <div class="space-y-3 pt-2">
              <NuxtLink 
                to="/checkout"
                @click="close"
                class="block w-full bg-gray-900 text-white py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors text-center"
              >
                Checkout
              </NuxtLink>
              <button 
                @click="close"
                class="block w-full text-gray-900 font-medium hover:text-gray-700 transition-colors text-center underline"
              >
                View Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </Teleport>
</template>

<script setup lang="ts">
import { useCartStore } from '~/stores/cart'

const cartStore = useCartStore()
const { items, totalPrice } = storeToRefs(cartStore)
const { removeItem: removeFromCart, updateQuantity: updateCartQuantity } = cartStore

const isOpen = ref(false)
const nuxtApp = useNuxtApp()

// Event listeners
onMounted(() => {
  nuxtApp.$bus.$on('toggle-cart-sidebar', () => {
    isOpen.value = !isOpen.value
  })
})

onUnmounted(() => {
  nuxtApp.$bus.$off('toggle-cart-sidebar', () => {})
})

// Methods
const close = () => {
  isOpen.value = false
}

const removeItem = (id: number) => {
  removeFromCart(id)
}

const updateQuantity = (id: number, quantity: number) => {
  if (quantity >= 1) {
    updateCartQuantity(id, quantity)
  }
}

// Disable body scroll when sidebar is open
watch(isOpen, (newVal) => {
  if (newVal) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
})
</script>

<style scoped>
/* Custom scrollbar for cart items */
.overflow-y-auto::-webkit-scrollbar {
  width: 6px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: #f3f4f6;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background: #d1d5db;
  border-radius: 3px;
}

.overflow-y-auto::-webkit-scrollbar-thumb:hover {
  background: #9ca3af;
}
</style>