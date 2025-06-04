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
        <h2 class="text-3xl font-semibold text-gray-900 mb-8">Sign Up</h2>
        
        <p class="text-gray-600 mb-8">
          Already have an account? 
          <NuxtLink to="/login" class="text-teal-600 hover:text-teal-700 font-medium">
            Sign In
          </NuxtLink>
        </p>

        <!-- Error message -->
        <div v-if="error" class="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {{ error }}
        </div>

        <!-- Success message -->
        <div v-if="successMessage" class="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
          {{ successMessage }}
        </div>

        <form @submit.prevent="handleRegister" class="space-y-6">
          <!-- Nombre -->
          <div>
            <input 
              v-model="formData.nombre"
              type="text" 
              placeholder="First name"
              class="w-full px-0 py-3 border-b border-gray-300 focus:border-gray-900 outline-none transition-colors bg-transparent"
              required
              :disabled="authStore.loading"
            >
          </div>

          <!-- Apellidos -->
          <div class="grid grid-cols-2 gap-4">
            <div>
              <input 
                v-model="formData.apaterno"
                type="text" 
                placeholder="Last name"
                class="w-full px-0 py-3 border-b border-gray-300 focus:border-gray-900 outline-none transition-colors bg-transparent"
                required
                :disabled="authStore.loading"
              >
            </div>
            <div>
              <input 
                v-model="formData.amaterno"
                type="text" 
                placeholder="Second last name"
                class="w-full px-0 py-3 border-b border-gray-300 focus:border-gray-900 outline-none transition-colors bg-transparent"
                :disabled="authStore.loading"
              >
            </div>
          </div>

          <!-- Email -->
          <div>
            <input 
              v-model="formData.usuario"
              type="email" 
              placeholder="Your email address"
              class="w-full px-0 py-3 border-b border-gray-300 focus:border-gray-900 outline-none transition-colors bg-transparent"
              required
              :disabled="authStore.loading"
            >
          </div>

          <!-- Teléfono -->
          <div>
            <input 
              v-model="formData.telefono"
              type="tel" 
              placeholder="Phone number"
              class="w-full px-0 py-3 border-b border-gray-300 focus:border-gray-900 outline-none transition-colors bg-transparent"
              required
              :disabled="authStore.loading"
            >
          </div>

          <!-- Dirección -->
          <div>
            <input 
              v-model="formData.direccion"
              type="text" 
              placeholder="Address"
              class="w-full px-0 py-3 border-b border-gray-300 focus:border-gray-900 outline-none transition-colors bg-transparent"
              required
              :disabled="authStore.loading"
            >
          </div>

          <!-- Ciudad y Estado -->
          <div class="grid grid-cols-2 gap-4">
            <div>
              <input 
                v-model="formData.ciudad"
                type="text" 
                placeholder="City"
                class="w-full px-0 py-3 border-b border-gray-300 focus:border-gray-900 outline-none transition-colors bg-transparent"
                required
                :disabled="authStore.loading"
              >
            </div>
            <div>
              <input 
                v-model="formData.estado"
                type="text" 
                placeholder="State"
                class="w-full px-0 py-3 border-b border-gray-300 focus:border-gray-900 outline-none transition-colors bg-transparent"
                required
                :disabled="authStore.loading"
              >
            </div>
          </div>

          <!-- Password -->
          <div class="relative">
            <input 
              v-model="formData.password"
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

          <!-- Confirm Password -->
          <div class="relative">
            <input 
              v-model="confirmPassword"
              :type="showConfirmPassword ? 'text' : 'password'"
              placeholder="Confirm password"
              class="w-full px-0 py-3 border-b border-gray-300 focus:border-gray-900 outline-none transition-colors bg-transparent pr-10"
              required
              :disabled="authStore.loading"
            >
            <button 
              type="button"
              @click="showConfirmPassword = !showConfirmPassword"
              class="absolute right-0 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              <Icon 
                :name="showConfirmPassword ? 'material-symbols:visibility-off-outline' : 'material-symbols:visibility-outline'" 
                class="w-5 h-5" 
              />
            </button>
          </div>

          <!-- Terms and conditions -->
          <div class="flex items-start">
            <input 
              v-model="acceptTerms"
              type="checkbox" 
              class="w-4 h-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500 mt-1"
              required
            >
            <label class="ml-2 text-sm text-gray-600">
              I agree to the 
              <a href="#" class="text-teal-600 hover:text-teal-700">Terms and Conditions</a> 
              and 
              <a href="#" class="text-teal-600 hover:text-teal-700">Privacy Policy</a>
            </label>
          </div>

          <!-- Submit button -->
          <button 
            type="submit"
            class="w-full bg-teal-700 text-white py-3 rounded-lg font-medium hover:bg-teal-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            :disabled="authStore.loading || !acceptTerms"
          >
            <span v-if="!authStore.loading">Create Account</span>
            <span v-else class="flex items-center justify-center">
              <Icon name="svg-spinners:3-dots-scale" class="w-5 h-5 mr-2" />
              Creating account...
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

interface CreateUserResponse {
  user?: any
  message?: string
  error?: string
}

// No usar el layout default
definePageMeta({
  layout: false
})

const router = useRouter()
const authStore = useAuthStore()

const formData = ref({
  nombre: '',
  apaterno: '',
  amaterno: '',
  usuario: '',
  telefono: '',
  direccion: '',
  ciudad: '',
  estado: '',
  password: ''
})

const confirmPassword = ref('')
const showPassword = ref(false)
const showConfirmPassword = ref(false)
const acceptTerms = ref(false)
const error = ref('')
const successMessage = ref('')

const handleRegister = async () => {
  error.value = ''
  successMessage.value = ''
  
  // Validar que las contraseñas coincidan
  if (formData.value.password !== confirmPassword.value) {
    error.value = 'Passwords do not match'
    return
  }

  // Validar longitud de contraseña
  if (formData.value.password.length < 6) {
    error.value = 'Password must be at least 6 characters'
    return
  }
  
  try {
    console.log('Intentando registrar con:', formData.value)
    
    // Usar el método register del store con todos los campos
    const result = await authStore.register(formData.value)
    
    console.log('Resultado del registro:', result)
    
    if (result) {
      // Mostrar mensaje de éxito
      successMessage.value = 'Account created successfully! Redirecting...'
      error.value = ''
      
      // Redirigir al login después de 2 segundos
      setTimeout(() => {
        router.push('/login')
      }, 2000)
    }
    
  } catch (err: any) {
    console.error('Error completo:', err)
    // Si el error es "usuario ya existe", sugerir ir al login
    if (err.message?.includes('ya existe')) {
      error.value = 'This email is already registered. Please sign in instead.'
      setTimeout(() => {
        router.push('/login')
      }, 2000)
    } else {
      error.value = err.message || 'Error creating account'
    }
  }
}

useHead({
  title: 'Sign Up - VisioCreate'
})
</script>

<style scoped>
/* Custom checkbox style */
input[type="checkbox"] {
  cursor: pointer;
}
</style>