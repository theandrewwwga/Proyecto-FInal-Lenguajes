<template>
  <div class="min-h-screen flex">
    <!-- Left side - Image -->
    <div class="hidden lg:flex lg:w-1/2 items-center justify-center p-8">
      <div class="relative w-full h-full max-h-[90vh] overflow-hidden rounded-2xl">
        <img 
          src="https://i.blogs.es/cac4a7/portada-alfombras/1366_2000.jpeg" 
          alt="VisioCreate furniture" 
          class="w-full h-full object-cover"
        >
        <!-- Dark overlay for better text visibility -->
        <div class="absolute inset-0 bg-black/20"></div>
        <!-- Logo overlay -->
        <div class="absolute top-8 left-0 right-0 flex justify-center">
          <h1 class="text-white text-3xl font-light">VisioCreate</h1>
        </div>
      </div>
    </div>

    <!-- Right side - Form -->
    <div class="w-full lg:w-1/2 flex items-center justify-center px-8 lg:px-16">
      <div class="w-full max-w-md">
        <h2 class="text-3xl font-semibold text-gray-900 mb-8">Sign In</h2>
        
        <p class="text-gray-600 mb-8">
          Don't have an account yet? 
          <NuxtLink to="/register" class="text-teal-600 hover:text-teal-700 font-medium">
            Sign Up
          </NuxtLink>
        </p>

        <!-- Error message -->
        <div v-if="error" class="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {{ error }}
        </div>

        <form @submit.prevent="handleLogin" class="space-y-6">
          <!-- Email input -->
          <div>
            <input 
              v-model="email"
              type="email" 
              placeholder="Your email address"
              class="w-full px-0 py-3 border-b border-gray-300 focus:border-gray-900 outline-none transition-colors bg-transparent"
              required
              :disabled="authStore.loading"
            >
          </div>

          <!-- Password input -->
          <div class="relative">
            <input 
              v-model="password"
              :type="showPassword ? 'text' : 'password'"
              placeholder="Password"
              class="w-full px-0 py-3 border-b border-gray-300 focus:border-gray-900 outline-none transition-colors bg-transparent pr-10"
              required
              :disabled="authStore.loading"
            >
            <button 
              type="button"
              @click="showPassword = !showPassword"
              class="absolute right-0 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              <Icon 
                :name="showPassword ? 'material-symbols:visibility-off-outline' : 'material-symbols:visibility-outline'" 
                class="w-5 h-5" 
              />
            </button>
          </div>

          <!-- Remember me and Forgot password -->
          <div class="flex items-center justify-between">
            <label class="flex items-center text-gray-600">
              <input 
                v-model="rememberMe"
                type="checkbox" 
                class="w-4 h-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
              >
              <span class="ml-2">Remember me</span>
            </label>
            <NuxtLink to="/forgot-password" class="text-gray-900 font-medium hover:text-gray-700">
              Forgot password?
            </NuxtLink>
          </div>

          <!-- Submit button -->
          <button 
            type="submit"
            class="w-full bg-teal-700 text-white py-3 rounded-lg font-medium hover:bg-teal-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            :disabled="authStore.loading"
          >
            <span v-if="!authStore.loading">Sign In</span>
            <span v-else class="flex items-center justify-center">
              <Icon name="svg-spinners:3-dots-scale" class="w-5 h-5 mr-2" />
              Signing in...
            </span>
          </button>
        </form>

        <!-- Social login divider -->
        <div class="mt-8">
          <div class="relative">
            <div class="absolute inset-0 flex items-center">
              <div class="w-full border-t border-gray-300"></div>
            </div>
            <div class="relative flex justify-center text-sm">
              <span class="px-4 bg-white text-gray-500">Or continue with</span>
            </div>
          </div>

          <!-- Social login buttons -->
          <div class="mt-6 grid grid-cols-2 gap-4">
            <button 
              type="button"
              class="flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Icon name="flat-color-icons:google" class="w-5 h-5" />
              <span class="ml-2 text-gray-700">Google</span>
            </button>
            <button 
              type="button"
              class="flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Icon name="logos:facebook" class="w-5 h-5" />
              <span class="ml-2 text-gray-700">Facebook</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '~/stores/auth'

// No usar el layout default
definePageMeta({
  layout: false
})

const router = useRouter()
const authStore = useAuthStore()

const email = ref('')
const password = ref('')
const rememberMe = ref(false)
const showPassword = ref(false)
const error = ref('')

const handleLogin = async () => {
  error.value = ''
  
  try {
    await authStore.login(email.value, password.value)
    // Si el login es exitoso, redirigir
    router.push('/')
  } catch (err: any) {
    error.value = err.message || 'Error al iniciar sesión'
    console.error('Login error:', err)
  }
}

useHead({
  title: 'Sign In - VisioCreate'
})
</script>

<style scoped>
/* Custom checkbox style */
input[type="checkbox"] {
  cursor: pointer;
}
</style>