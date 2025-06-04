<template>
    <div class="relative w-full h-full">
      <!-- Map placeholder with interactive elements -->
      <div class="absolute inset-0 bg-gradient-to-br from-blue-100 to-blue-200">
        <!-- Grid pattern to simulate map -->
        <div class="absolute inset-0 opacity-20">
          <div class="grid grid-cols-12 grid-rows-8 h-full">
            <div v-for="i in 96" :key="i" class="border border-blue-300"></div>
          </div>
        </div>
        
        <!-- Simulated streets -->
        <div class="absolute top-1/4 left-0 right-0 h-2 bg-white opacity-60"></div>
        <div class="absolute top-3/4 left-0 right-0 h-1 bg-white opacity-40"></div>
        <div class="absolute left-1/3 top-0 bottom-0 w-1 bg-white opacity-40"></div>
        <div class="absolute left-2/3 top-0 bottom-0 w-2 bg-white opacity-60"></div>
        
        <!-- Location pin -->
        <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div class="relative">
            <!-- Pin shadow -->
            <div class="absolute top-8 left-1/2 transform -translate-x-1/2 w-6 h-3 bg-black opacity-20 rounded-full blur-sm"></div>
            
            <!-- Pin -->
            <div class="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center shadow-lg animate-bounce">
              <Icon name="material-symbols:location-on" class="w-6 h-6 text-white" />
            </div>
            
            <!-- Info popup -->
            <div class="absolute bottom-16 left-1/2 transform -translate-x-1/2 bg-white rounded-lg shadow-xl p-4 min-w-48 z-10">
              <div class="text-center">
                <h4 class="font-semibold text-gray-900 mb-1">VisioCreate Store</h4>
                <p class="text-sm text-gray-600 mb-2">234 Hai Trieu, Ho Chi Minh City</p>
                <div class="flex items-center justify-center text-xs text-gray-500">
                  <Icon name="material-symbols:phone" class="w-3 h-3 mr-1" />
                  <span>+84 234 567 890</span>
                </div>
              </div>
              <!-- Arrow pointing down -->
              <div class="absolute top-full left-1/2 transform -translate-x-1/2 -translate-y-1 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-white"></div>
            </div>
          </div>
        </div>
        
        <!-- Simulated buildings/landmarks -->
        <div class="absolute top-1/4 left-1/4 w-8 h-6 bg-gray-400 opacity-60 rounded"></div>
        <div class="absolute top-1/3 right-1/4 w-6 h-8 bg-gray-500 opacity-60 rounded"></div>
        <div class="absolute bottom-1/4 left-1/5 w-10 h-4 bg-gray-400 opacity-60 rounded"></div>
        <div class="absolute bottom-1/3 right-1/3 w-4 h-6 bg-gray-500 opacity-60 rounded"></div>
        
        <!-- Parks/green areas -->
        <div class="absolute top-1/6 right-1/6 w-12 h-8 bg-green-300 opacity-60 rounded-full"></div>
        <div class="absolute bottom-1/5 left-1/2 w-8 h-8 bg-green-300 opacity-60 rounded-full"></div>
      </div>
      
      <!-- Map controls -->
      <div class="absolute top-4 right-4 flex flex-col space-y-2">
        <button class="w-10 h-10 bg-white rounded shadow-md hover:shadow-lg transition-shadow flex items-center justify-center">
          <Icon name="material-symbols:add" class="w-5 h-5 text-gray-600" />
        </button>
        <button class="w-10 h-10 bg-white rounded shadow-md hover:shadow-lg transition-shadow flex items-center justify-center">
          <Icon name="material-symbols:remove" class="w-5 h-5 text-gray-600" />
        </button>
      </div>
      
      <!-- Map attribution -->
      <div class="absolute bottom-4 left-4">
        <div class="bg-white bg-opacity-90 rounded px-2 py-1 text-xs text-gray-600">
          © VisioCreate Map
        </div>
      </div>
      
      <!-- "Open in Maps" button -->
      <div class="absolute bottom-4 right-4">
        <button class="bg-blue-600 text-white px-4 py-2 rounded shadow-md hover:bg-blue-700 transition-colors text-sm font-medium">
          Open in Maps
        </button>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  // Component for displaying the contact map
  // In a real implementation, you would integrate with Google Maps, Mapbox, or similar service
  </script>