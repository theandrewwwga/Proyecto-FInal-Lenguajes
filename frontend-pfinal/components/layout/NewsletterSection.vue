<template>
    <section class="relative py-24 overflow-hidden">
      <!-- Background Image -->
      <div class="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1920&q=80" 
          alt="Newsletter background" 
          class="w-full h-full object-cover"
        >
        <div class="absolute inset-0 bg-black/40"></div>
      </div>
      
      <!-- Content -->
      <div class="relative z-10 max-w-6xl mx-auto px-4 text-center">
        <h2 class="text-4xl font-bold mb-4 text-white">Join Our Newsletter</h2>
        <p class="text-gray-200 mb-10 max-w-lg mx-auto text-lg">
          Sign up for deals, new products and promotions
        </p>
        <div class="max-w-lg mx-auto">
          <form @submit.prevent="handleSubmit" class="relative">
            <div class="flex items-center border-b border-gray-400 pb-3">
              <Icon name="material-symbols:mail-outline" class="w-6 h-6 text-gray-300 mr-3" />
              <input 
                v-model="email"
                type="email" 
                placeholder="Email address" 
                class="flex-1 bg-transparent outline-none text-white placeholder-gray-400 text-lg"
                required
              >
              <button 
                type="submit" 
                class="text-gray-300 hover:text-white font-medium transition-colors ml-4 text-lg"
              >
                Signup
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue'
  
  const email = ref('')
  
  const handleSubmit = () => {
    // Handle newsletter signup
    console.log('Newsletter signup:', email.value)
    // Here you would typically send the email to your backend
    email.value = ''
  }
  </script>