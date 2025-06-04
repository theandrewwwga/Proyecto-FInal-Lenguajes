<template>
    <div class="min-h-screen bg-white">
      <!-- Breadcrumb -->
      <section class="bg-gray-50 py-8">
        <div class="max-w-6xl mx-auto px-4">
          <nav class="flex items-center space-x-2 text-sm text-gray-600">
            <NuxtLink to="/" class="hover:text-gray-900 transition-colors">Home</NuxtLink>
            <Icon name="material-symbols:chevron-right" class="w-4 h-4" />
            <span class="text-gray-900">Contact Us</span>
          </nav>
        </div>
      </section>
  
      <!-- Hero Section -->
      <section class="py-16">
        <div class="max-w-4xl mx-auto px-4 text-center">
          <h1 class="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            We believe in sustainable decor. We're passionate about life at home.
          </h1>
          <p class="text-lg text-gray-600 leading-relaxed max-w-3xl mx-auto">
            Our features timeless furniture, with natural fabrics, curved lines, plenty of mirrors and classic design, which can be incorporated into any decor project. The pieces enchant for their sobriety, to last for generations, faithful to the shapes of each period, with a touch of the present
          </p>
        </div>
      </section>
  
      <!-- About Us Section with Image -->
      <section class="py-16 bg-gray-50">
        <div class="max-w-6xl mx-auto px-4">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <!-- Image -->
            <div class="relative">
              <img 
                src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80"
                alt="Modern living room"
                class="w-full rounded-2xl shadow-large"
              >
            </div>
            
            <!-- Content -->
            <div>
              <h2 class="text-3xl font-bold text-gray-900 mb-6">About Us</h2>
              <p class="text-gray-600 mb-4 leading-relaxed">
                VisioCreate is a gift & decorations store based in HCMC, Vietnam. Est since 2019.
              </p>
              <p class="text-gray-600 mb-8 leading-relaxed">
                Our customer service is always prepared to support you 24/7
              </p>
              <NuxtLink 
                to="/shop" 
                class="inline-flex items-center text-gray-900 font-medium hover:text-gray-700 transition-colors group"
              >
                <span class="border-b border-gray-900 pb-1">Shop Now</span>
                <Icon name="material-symbols:arrow-forward" class="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </NuxtLink>
            </div>
          </div>
        </div>
      </section>
  
      <!-- Contact Form and Info Section -->
      <section class="py-16">
        <div class="max-w-6xl mx-auto px-4">
          <div class="text-center mb-12">
            <h2 class="text-3xl font-bold text-gray-900 mb-4">Contact Us</h2>
          </div>
  
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <!-- Contact Information -->
            <div class="space-y-8">
              <!-- Address -->
              <div class="text-center">
                <div class="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                  <Icon name="material-symbols:location-on" class="w-8 h-8 text-gray-600" />
                </div>
                <h3 class="font-semibold text-gray-900 mb-2">ADDRESS</h3>
                <p class="text-gray-600">
                  234 Hai Trieu, Ho Chi Minh City,<br>
                  Viet Nam
                </p>
              </div>
  
              <!-- Contact Info -->
              <div class="text-center">
                <div class="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                  <Icon name="material-symbols:phone" class="w-8 h-8 text-gray-600" />
                </div>
                <h3 class="font-semibold text-gray-900 mb-2">CONTACT US</h3>
                <p class="text-gray-600">+84 234 567 890</p>
              </div>
  
              <!-- Email -->
              <div class="text-center">
                <div class="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                  <Icon name="material-symbols:mail" class="w-8 h-8 text-gray-600" />
                </div>
                <h3 class="font-semibold text-gray-900 mb-2">EMAIL</h3>
                <p class="text-gray-600">hello@VisioCreate.com</p>
              </div>
            </div>
  
            <!-- Contact Form -->
            <div>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
  
      <!-- Map Section -->
      <section class="py-0">
        <div class="max-w-6xl mx-auto px-4">
          <div class="h-96 bg-gray-200 rounded-2xl overflow-hidden">
            <ContactMap />
          </div>
        </div>
      </section>
  
      <!-- Features Section -->
      <section class="py-16">
        <div class="max-w-6xl mx-auto px-4">
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            
            <div class="text-center p-6">
              <div class="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                <Icon name="heroicons:truck" class="w-8 h-8 text-gray-600" />
              </div>
              <h3 class="font-bold text-gray-900 mb-2">Free Shipping</h3>
              <p class="text-gray-600 text-sm">Order above $200</p>
            </div>
            
            <div class="text-center p-6">
              <div class="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                <Icon name="heroicons:arrow-path" class="w-8 h-8 text-gray-600" />
              </div>
              <h3 class="font-bold text-gray-900 mb-2">Money-back</h3>
              <p class="text-gray-600 text-sm">30 days guarantee</p>
            </div>
            
            <div class="text-center p-6">
              <div class="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                <Icon name="heroicons:shield-check" class="w-8 h-8 text-gray-600" />
              </div>
              <h3 class="font-bold text-gray-900 mb-2">Secure Payments</h3>
              <p class="text-gray-600 text-sm">Secured by Stripe</p>
            </div>
            
            <div class="text-center p-6">
              <div class="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                <Icon name="heroicons:chat-bubble-left-right" class="w-8 h-8 text-gray-600" />
              </div>
              <h3 class="font-bold text-gray-900 mb-2">24/7 Support</h3>
              <p class="text-gray-600 text-sm">Phone and Email support</p>
            </div>
            
          </div>
        </div>
      </section>
    </div>
  </template>
  
  <script setup lang="ts">
  // Definir el layout a usar
  definePageMeta({
    layout: 'default'
  })
  
  useHead({
    title: 'Contact Us - VisioCreate',
    meta: [
      { name: 'description', content: 'Get in touch with VisioCreate. We\'re here to help with your home decor needs.' }
    ]
  })
  </script> 