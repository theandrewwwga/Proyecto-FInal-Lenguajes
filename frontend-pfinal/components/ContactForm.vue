<template>
    <form @submit.prevent="submitForm" class="space-y-6">
      <!-- Full Name -->
      <div>
        <label for="fullName" class="block text-sm font-medium text-gray-700 mb-2">
          FULL NAME
        </label>
        <input
          id="fullName"
          v-model="form.fullName"
          type="text"
          placeholder="Your Name"
          class="input w-full"
          :class="{ 'input-error': errors.fullName }"
          required
        >
        <p v-if="errors.fullName" class="mt-1 text-sm text-red-600">
          {{ errors.fullName }}
        </p>
      </div>
  
      <!-- Email Address -->
      <div>
        <label for="email" class="block text-sm font-medium text-gray-700 mb-2">
          EMAIL ADDRESS
        </label>
        <input
          id="email"
          v-model="form.email"
          type="email"
          placeholder="Your Email"
          class="input w-full"
          :class="{ 'input-error': errors.email }"
          required
        >
        <p v-if="errors.email" class="mt-1 text-sm text-red-600">
          {{ errors.email }}
        </p>
      </div>
  
      <!-- Message -->
      <div>
        <label for="message" class="block text-sm font-medium text-gray-700 mb-2">
          MESSAGE
        </label>
        <textarea
          id="message"
          v-model="form.message"
          rows="6"
          placeholder="Your message"
          class="input w-full resize-none"
          :class="{ 'input-error': errors.message }"
          required
        ></textarea>
        <p v-if="errors.message" class="mt-1 text-sm text-red-600">
          {{ errors.message }}
        </p>
      </div>
  
      <!-- Submit Button -->
      <button
        type="submit"
        :disabled="isSubmitting"
        class="w-full bg-gray-900 text-white py-3 px-6 rounded-lg font-medium hover:bg-gray-800 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
      >
        <span v-if="isSubmitting" class="spinner mr-2"></span>
        {{ isSubmitting ? 'Sending...' : 'Send Message' }}
      </button>
  
      <!-- Success Message -->
      <div v-if="showSuccess" class="p-4 bg-green-50 border border-green-200 rounded-lg">
        <div class="flex items-center">
          <Icon name="ph:check-circle" class="w-5 h-5 text-green-500 mr-2" />
          <p class="text-green-800 font-medium">Message sent successfully!</p>
        </div>
        <p class="text-green-700 text-sm mt-1">We'll get back to you soon.</p>
      </div>
  
      <!-- Error Message -->
      <div v-if="showError" class="p-4 bg-red-50 border border-red-200 rounded-lg">
        <div class="flex items-center">
          <Icon name="ph:warning-circle" class="w-5 h-5 text-red-500 mr-2" />
          <p class="text-red-800 font-medium">Failed to send message</p>
        </div>
        <p class="text-red-700 text-sm mt-1">Please try again later.</p>
      </div>
    </form>
  </template>
  
  <script setup lang="ts">
  interface ContactForm {
    fullName: string
    email: string
    message: string
  }
  
  interface FormErrors {
    fullName?: string
    email?: string
    message?: string
  }
  
  const form = ref<ContactForm>({
    fullName: '',
    email: '',
    message: ''
  })
  
  const errors = ref<FormErrors>({})
  const isSubmitting = ref(false)
  const showSuccess = ref(false)
  const showError = ref(false)
  
  const validateForm = (): boolean => {
    errors.value = {}
    
    if (!form.value.fullName.trim()) {
      errors.value.fullName = 'Full name is required'
    }
    
    if (!form.value.email.trim()) {
      errors.value.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(form.value.email)) {
      errors.value.email = 'Please enter a valid email'
    }
    
    if (!form.value.message.trim()) {
      errors.value.message = 'Message is required'
    } else if (form.value.message.trim().length < 10) {
      errors.value.message = 'Message must be at least 10 characters long'
    }
    
    return Object.keys(errors.value).length === 0
  }
  
  const submitForm = async () => {
    // Reset previous states
    showSuccess.value = false
    showError.value = false
    
    if (!validateForm()) {
      return
    }
    
    isSubmitting.value = true
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Simulate success (you can replace this with actual API call)
      const success = Math.random() > 0.2 // 80% success rate for demo
      
      if (success) {
        showSuccess.value = true
        // Reset form
        form.value = {
          fullName: '',
          email: '',
          message: ''
        }
        
        // Hide success message after 5 seconds
        setTimeout(() => {
          showSuccess.value = false
        }, 5000)
      } else {
        throw new Error('Failed to send message')
      }
    } catch (error) {
      showError.value = true
      
      // Hide error message after 5 seconds
      setTimeout(() => {
        showError.value = false
      }, 5000)
    } finally {
      isSubmitting.value = false
    }
  }
  </script>