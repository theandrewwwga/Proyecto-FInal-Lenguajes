<template>
  <header class="bg-white sticky top-0 z-50">
    <!-- Top Bar with Contact Info -->
    <div class="hidden md:block bg-gray-50 border-b border-gray-200">
      <div class="container mx-auto px-4">
        <div class="flex items-center justify-between h-10 text-sm">
          <div class="flex items-center space-x-4 text-gray-600">
            <span class="flex items-center">
              <Icon name="material-symbols:location-on-outline" class="w-4 h-4 mr-1" />
              20% off storewide — Limited time!
            </span>
          </div>
          <button class="text-gray-600 hover:text-gray-900 transition-colors duration-200">
            Shop Now →
          </button>
        </div>
      </div>
    </div>

    <!-- Main Navigation -->
    <div class="container mx-auto px-4">
      <div class="flex items-center justify-between h-16">
        <!-- Logo -->
        <NuxtLink to="/" class="flex items-center">
          <h1 class="text-2xl font-semibold text-gray-900">VisioCreate</h1>
        </NuxtLink>

        <!-- Navigation Links (Desktop) -->
        <nav class="hidden md:flex items-center space-x-8">
          <NuxtLink 
            to="/" 
            class="text-gray-600 hover:text-gray-900 transition-colors duration-200 text-sm font-medium"
            :class="{ 'text-gray-900': $route.path === '/' }"
          >
            Home
          </NuxtLink>
          <NuxtLink 
            to="/shop" 
            class="text-gray-600 hover:text-gray-900 transition-colors duration-200 text-sm font-medium"
            :class="{ 'text-gray-900': $route.path.includes('/shop') }"
          >
            Shop
          </NuxtLink>
          <NuxtLink 
            to="/products" 
            class="text-gray-600 hover:text-gray-900 transition-colors duration-200 text-sm font-medium"
            :class="{ 'text-gray-900': $route.path.includes('/blog') }"
          >
            Products
          </NuxtLink>
          <NuxtLink 
            to="/blog" 
            class="text-gray-600 hover:text-gray-900 transition-colors duration-200 text-sm font-medium"
            :class="{ 'text-gray-900': $route.path === '/about' }"
          >
            Blog
          </NuxtLink>
          <NuxtLink 
            to="/contact" 
            class="text-gray-600 hover:text-gray-900 transition-colors duration-200 text-sm font-medium"
            :class="{ 'text-gray-900': $route.path === '/about' }"
          >
            Contact Us
          </NuxtLink>
        </nav>

        <!-- Right Side Icons -->
        <div class="flex items-center space-x-1">
          <!-- Search Button -->
          <button 
            @click="toggleSearch"
            class="p-2 text-gray-600 hover:text-gray-900 transition-colors duration-200 rounded-full hover:bg-gray-100"
          >
            <Icon name="material-symbols:search" class="w-5 h-5" />
          </button>

          <!-- User Account -->
          <div class="relative" ref="userDropdownRef">
            <button 
              @click="toggleUserDropdown"
              class="p-2 text-gray-600 hover:text-gray-900 transition-colors duration-200 rounded-full hover:bg-gray-100"
            >
              <Icon name="material-symbols:person-outline" class="w-5 h-5" />
            </button>
            
            <!-- User Dropdown Menu -->
            <transition
              enter-active-class="transition ease-out duration-100"
              enter-from-class="transform opacity-0 scale-95"
              enter-to-class="transform opacity-100 scale-100"
              leave-active-class="transition ease-in duration-75"
              leave-from-class="transform opacity-100 scale-100"
              leave-to-class="transform opacity-0 scale-95"
            >
              <div 
                v-if="isUserDropdownOpen" 
                class="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 z-50 border border-gray-100"
              >
                <template v-if="!isLoggedIn">
                  <NuxtLink 
                    to="/login" 
                    class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                    @click="isUserDropdownOpen = false"
                  >
                    Login
                  </NuxtLink>
                  <NuxtLink 
                    to="/register" 
                    class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                    @click="isUserDropdownOpen = false"
                  >
                    Register
                  </NuxtLink>
                </template>
                <template v-else>
                  <NuxtLink 
                    to="/profile" 
                    class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                    @click="isUserDropdownOpen = false"
                  >
                    My Profile
                  </NuxtLink>
                  <NuxtLink 
                    to="/profile/orders" 
                    class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                    @click="isUserDropdownOpen = false"
                  >
                    My Orders
                  </NuxtLink>
                  <hr class="my-1">
                  <button 
                    @click="logout"
                    class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                  >
                    Logout
                  </button>
                </template>
              </div>
            </transition>
          </div>

          <!-- Shopping Cart -->
          <button 
            @click="toggleCart"
            class="p-2 text-gray-600 hover:text-gray-900 transition-colors duration-200 relative rounded-full hover:bg-gray-100"
          >
            <Icon name="material-symbols:shopping-bag-outline" class="w-5 h-5" />
            <!-- Cart Badge -->
            <span 
              v-if="cartItemCount > 0"
              class="absolute -top-1 -right-1 bg-teal-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium"
            >
              {{ cartItemCount }}
            </span>
          </button>

          <!-- Mobile Menu Button -->
          <button 
            @click="toggleMobileMenu"
            class="md:hidden p-2 text-gray-600 hover:text-gray-900 transition-colors duration-200 rounded-full hover:bg-gray-100"
          >
            <Icon :name="isMobileMenuOpen ? 'material-symbols:close' : 'material-symbols:menu'" class="w-6 h-6" />
          </button>
        </div>
      </div>

      <!-- Mobile Menu -->
      <transition
        enter-active-class="transition ease-out duration-200"
        enter-from-class="opacity-0 -translate-y-1"
        enter-to-class="opacity-100 translate-y-0"
        leave-active-class="transition ease-in duration-150"
        leave-from-class="opacity-100 translate-y-0"
        leave-to-class="opacity-0 -translate-y-1"
      >
        <nav v-if="isMobileMenuOpen" class="md:hidden pb-4 border-t border-gray-200">
          <div class="flex flex-col space-y-1 mt-4">
            <NuxtLink 
              to="/" 
              class="px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors duration-200"
              @click="isMobileMenuOpen = false"
            >
              Home
            </NuxtLink>
            <NuxtLink 
              to="/shop" 
              class="px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors duration-200"
              @click="isMobileMenuOpen = false"
            >
              Shop
            </NuxtLink>
            <NuxtLink 
              to="/products" 
              class="px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors duration-200"
              @click="isMobileMenuOpen = false"
            >
              Products
            </NuxtLink>
            <NuxtLink 
              to="/contact" 
              class="px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors duration-200"
              @click="isMobileMenuOpen = false"
            >
              Contact Us
            </NuxtLink>
          </div>
        </nav>
      </transition>
    </div>

    <!-- Search Overlay -->
    <transition
      enter-active-class="transition ease-out duration-300"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition ease-in duration-200"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div 
        v-if="isSearchOpen" 
        class="fixed inset-0 bg-black bg-opacity-50 z-50"
        @click="toggleSearch"
      >
        <div class="container mx-auto px-4 mt-20">
          <div 
            class="bg-white rounded-lg p-6 max-w-2xl mx-auto shadow-xl"
            @click.stop
          >
            <div class="flex items-center space-x-4">
              <Icon name="material-symbols:search" class="w-6 h-6 text-gray-400" />
              <input
                ref="searchInput"
                v-model="searchQuery"
                type="text"
                placeholder="Search for products..."
                class="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                @keyup.enter="performSearch"
              >
              <button
                @click="performSearch"
                class="px-6 py-3 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors duration-200 font-medium"
              >
                Search
              </button>
              <button
                @click="toggleSearch"
                class="p-2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
              >
                <Icon name="material-symbols:close" class="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </header>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import { useCartStore } from '~/stores/cart'
import { useAuthStore } from '~/stores/auth'

const router = useRouter()
const cartStore = useCartStore()
const authStore = useAuthStore()

// State
const isMobileMenuOpen = ref(false)
const isSearchOpen = ref(false)
const isUserDropdownOpen = ref(false)
const searchQuery = ref('')
const searchInput = ref(null)
const userDropdownRef = ref(null)

// Computed
const cartItemCount = computed(() => cartStore.itemCount)
const isLoggedIn = computed(() => authStore.isAuthenticated)

// Methods
const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const toggleSearch = () => {
  isSearchOpen.value = !isSearchOpen.value
  if (isSearchOpen.value) {
    nextTick(() => {
      searchInput.value?.focus()
    })
  }
}

const toggleUserDropdown = () => {
  isUserDropdownOpen.value = !isUserDropdownOpen.value
}

const toggleCart = () => {
  // Emitir evento para abrir el sidebar del carrito
  const nuxtApp = useNuxtApp()
  nuxtApp.$bus.$emit('toggle-cart-sidebar')
}

const performSearch = () => {
  if (searchQuery.value.trim()) {
    router.push(`/shop?search=${encodeURIComponent(searchQuery.value)}`)
    isSearchOpen.value = false
    searchQuery.value = ''
  }
}

const logout = () => {
  authStore.logout()
  isUserDropdownOpen.value = false
  router.push('/')
}

// Click outside handler for user dropdown
const handleClickOutside = (event) => {
  if (userDropdownRef.value && !userDropdownRef.value.contains(event.target)) {
    isUserDropdownOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<style scoped>
/* Custom styles for smooth transitions */
.container {
  transition: all 0.3s ease;
}

/* Hover effects for navigation links */
nav a {
  position: relative;
}

nav a::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 0;
  height: 2px;
  background-color: #14b8a6;
  transition: width 0.3s ease;
}

nav a:hover::after,
nav a.text-gray-900::after {
  width: 100%;
}

/* Custom badge animation */
.bg-teal-500 {
  animation: badge-pulse 2s infinite;
}

@keyframes badge-pulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
}
</style>
