<template>
  <footer class="bg-gray-900 text-white">
    <!-- Footer Top -->
    <div class="container mx-auto px-4 py-12">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <!-- Company Info -->
        <div>
          <h3 class="text-xl font-semibold mb-4">VisioCre8te</h3>
          <p class="text-gray-400 mb-4">
            Gift & decoration store based in HCMC, Vietnam. Est since 2019.
          </p>
          <div class="flex space-x-4">
            <a href="#" class="text-gray-400 hover:text-white transition-colors duration-200">
              <Icon name="mdi:facebook" class="w-6 h-6" />
            </a>
            <a href="#" class="text-gray-400 hover:text-white transition-colors duration-200">
              <Icon name="mdi:twitter" class="w-6 h-6" />
            </a>
            <a href="#" class="text-gray-400 hover:text-white transition-colors duration-200">
              <Icon name="mdi:instagram" class="w-6 h-6" />
            </a>
          </div>
        </div>

        <!-- Quick Links -->
        <div>
          <h4 class="text-lg font-semibold mb-4">Quick Links</h4>
          <ul class="space-y-2">
            <li>
              <NuxtLink to="/about" class="text-gray-400 hover:text-white transition-colors duration-200">
                About Us
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/shop" class="text-gray-400 hover:text-white transition-colors duration-200">
                Shop
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/blog" class="text-gray-400 hover:text-white transition-colors duration-200">
                Blog
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/contact" class="text-gray-400 hover:text-white transition-colors duration-200">
                Contact
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Customer Service -->
        <div>
          <h4 class="text-lg font-semibold mb-4">Customer Service</h4>
          <ul class="space-y-2">
            <li>
              <a href="#" class="text-gray-400 hover:text-white transition-colors duration-200">
                Shipping & Returns
              </a>
            </li>
            <li>
              <a href="#" class="text-gray-400 hover:text-white transition-colors duration-200">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" class="text-gray-400 hover:text-white transition-colors duration-200">
                Terms & Conditions
              </a>
            </li>
            <li>
              <a href="#" class="text-gray-400 hover:text-white transition-colors duration-200">
                FAQ
              </a>
            </li>
          </ul>
        </div>

        <!-- Newsletter -->
        <div>
          <h4 class="text-lg font-semibold mb-4">Newsletter</h4>
          <p class="text-gray-400 mb-4">
            Subscribe to get special offers and new product updates.
          </p>
          <form class="flex flex-col space-y-2">
            <input
              type="email"
              placeholder="Your email"
              class="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-teal-500 transition-colors duration-200"
            />
            <button
              type="submit"
              class="px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors duration-200"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </div>

    <!-- Footer Bottom -->
    <div class="border-t border-gray-800">
      <div class="container mx-auto px-4 py-6">
        <div class="flex flex-col md:flex-row justify-between items-center">
          <p class="text-gray-400 text-sm">
            © 2024 VisioCre8te. All rights reserved.
          </p>
          <div class="flex space-x-6 mt-4 md:mt-0">
            <Icon name="logos:visa" class="h-8" />
            <Icon name="logos:mastercard" class="h-8" />
            <Icon name="logos:paypal" class="h-8" />
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
// Footer component - no logic needed for now
</script>
