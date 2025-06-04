<template>
  <div class="min-h-screen bg-white">
    
      <!-- Hero Carousel Section -->
      <section class="relative">
        <div class="max-w-6xl mx-auto px-4 py-2">
          <div class="relative">
          <!-- Carousel Container -->
        <div class="relative overflow-hidden rounded-2xl">
            <!-- Single Slide Container -->
            <div class="relative min-h-[550px] lg:min-h-[750px]">
        <!-- Background Image with Transition -->
        <transition name="slide" mode="out-in">
          <div
            v-if="carouselSlides[currentSlide]"
            :key="carouselSlides[currentSlide].id"
            class="absolute inset-0 bg-cover bg-center bg-no-repeat"
            :style="`background-image: url('${carouselSlides[currentSlide].image}')`"
          ></div>
        </transition>
        
        <!-- Dark Overlay for better text readability -->        
        <!-- Text Content - Fixed positioning -->
        <div class="absolute inset-0 z-20 flex items-top">
          <div class="text-white p-8 lg:p-12 max-w-2xl">
            <transition name="fade" mode="out-in">
              <div v-if="carouselSlides[currentSlide]" :key="carouselSlides[currentSlide].id">
                <h1 class="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight drop-shadow-lg">
                  {{ carouselSlides[currentSlide].title }}
                </h1>
                <p class="text-lg md:text-xl mb-8 text-white/90 leading-relaxed drop-shadow-md">
                  {{ carouselSlides[currentSlide].description }}
                </p>
              </div>
            </transition>
          </div>
        </div>
      </div>
      
      <!-- Navigation Arrows -->
      <button 
        @click="previousSlide"
        class="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white w-12 h-12 rounded-full text-black hover:bg-white/50 transition-all duration-300 z-20 shadow-medium flex items-center justify-center"
      >
        <Icon name="material-symbols:chevron-left" class="w-6 h-6" />
      </button>
      <button 
        @click="nextSlide"
        class="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white w-12 h-12 rounded-full text-black hover:bg-white/50 transition-all duration-300 z-20 shadow-medium flex items-center justify-center"
      >
        <Icon name="material-symbols:chevron-right" class="w-6 h-6" />
      </button>
      
      <!-- Dots Indicator -->
      <div class="absolute bottom-4 md:bottom-8 left-1/2 -translate-x-1/2 flex space-x-2 z-20">
        <button
          v-for="(slide, index) in carouselSlides"
          :key="slide.id"
          @click="() => {
            currentSlide = index
            stopAutoPlay()
            startAutoPlay()
          }"
          class="w-2 h-2 md:w-3 md:h-3 rounded-full transition-all duration-300"
          :class="index === currentSlide ? 'bg-white w-6 md:w-8' : 'bg-white/50 hover:bg-white/70'"
          :aria-label="`Go to slide ${index + 1}`"
        ></button>
      </div>
    </div>
  </div>
</div>
</section>




    <!-- Categories Section -->
    <section class="py-16">
      <div class="max-w-6xl mx-auto px-4">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <!-- Living Room - Columna Izquierda -->
          <NuxtLink to="/shop?category=living-room" class="group cursor-pointer h-full">
            <div class="relative overflow-hidden rounded-lg shadow-sm hover:shadow-xl transition-all duration-300 h-full min-h-[400px] md:min-h-[500px]">
              <!-- Imagen de fondo -->
              <img 
                src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80" 
                alt="Living Room" 
                class="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              >
              <!-- Overlay oscuro para mejor legibilidad -->
              <div class="absolute inset-0 bg-gradient-to-br from-black/60 via-black/30 to-transparent"></div>
              
              <!-- Contenido posicionado arriba a la izquierda -->
              <div class="absolute top-8 left-8 text-white">
                <h3 class="text-3xl md:text-4xl font-bold mb-3 drop-shadow-lg">Living Room</h3>
                <p class="text-lg md:text-xl flex items-center group-hover:translate-x-1 transition-transform duration-300 drop-shadow-md">
                  Shop Now 
                  <Icon name="material-symbols:arrow-forward" class="ml-2 w-6 h-6" />
                </p>
              </div>
            </div>
          </NuxtLink>

          <!-- Columna Derecha con Bedroom y Kitchen -->
          <div class="flex flex-col gap-8">
            <!-- Bedroom -->
            <NuxtLink to="/shop?category=bedroom" class="group cursor-pointer">
              <div class="relative overflow-hidden rounded-lg shadow-sm hover:shadow-xl transition-all duration-300 h-[240px]">
                <!-- Imagen de fondo -->
                <img 
                  src="https://images.unsplash.com/photo-1616594039964-ae9521a996c0?w=800&q=80" 
                  alt="Bedroom" 
                  class="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                >
                <!-- Overlay oscuro -->
                <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                
                <!-- Contenido posicionado abajo -->
                <div class="absolute bottom-6 left-6 text-white">
                  <h3 class="text-2xl md:text-3xl font-bold mb-2 drop-shadow-lg">Bedroom</h3>
                  <p class="text-lg flex items-center group-hover:translate-x-1 transition-transform duration-300 drop-shadow-md">
                    Shop Now 
                    <Icon name="material-symbols:arrow-forward" class="ml-2 w-5 h-5" />
                  </p>
                </div>
              </div>
            </NuxtLink>

            <!-- Kitchen -->
            <NuxtLink to="/shop?category=kitchen" class="group cursor-pointer">
              <div class="relative overflow-hidden rounded-lg shadow-sm hover:shadow-xl transition-all duration-300 h-[240px]">
                <!-- Imagen de fondo -->
                <img 
                  src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80" 
                  alt="Kitchen" 
                  class="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                >
                <!-- Overlay oscuro -->
                <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                
                <!-- Contenido posicionado abajo -->
                <div class="absolute bottom-6 left-6 text-white">
                  <h3 class="text-2xl md:text-3xl font-bold mb-2 drop-shadow-lg">Kitchen</h3>
                  <p class="text-lg flex items-center group-hover:translate-x-1 transition-transform duration-300 drop-shadow-md">
                    Shop Now 
                    <Icon name="material-symbols:arrow-forward" class="ml-2 w-5 h-5" />
                  </p>
                </div>
              </div>
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>

         <!-- New Arrivals Section -->
         <section class="py-16 bg-gray-50">
        <div class="max-w-6xl mx-auto px-4">
          <div class="flex justify-between items-center mb-12">
            <div>
              <h2 class="text-4xl font-bold text-gray-900 mb-4">New Arrivals</h2>
            </div>
            <NuxtLink to="/products" class="text-primary-600 hover:text-primary-700 font-medium">
              More Products →
            </NuxtLink>
          </div>
  
          <div v-if="loading" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            <div v-for="i in 5" :key="i" class="card animate-pulse">
              <div class="card-body">
                <div class="w-full h-48 bg-gray-200 rounded-lg mb-4"></div>
                <div class="h-4 bg-gray-200 rounded mb-2"></div>
                <div class="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
                <div class="flex justify-between items-center">
                  <div class="h-6 bg-gray-200 rounded w-16"></div>
                  <div class="h-10 bg-gray-200 rounded w-24"></div>
                </div>
              </div>
            </div>
          </div>
  
          <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            <div 
              v-for="product in newArrivals" 
              :key="product.id" 
              class="group relative"
            >
              <div class="bg-white rounded-lg overflow-hidden">
                <!-- Image section with gray background -->
                <div class="relative bg-gray-100 aspect-square p-4">
                  <!-- Badges stacked on top left -->
                  <div class="absolute top-3 left-3 z-10 flex flex-col gap-2">
                    <span v-if="product.isNew" class="bg-gray-900 text-white text-xs font-bold px-3 py-1 rounded">
                      NEW
                    </span>
                    <span v-if="product.discount" class="bg-green-500 text-white text-xs font-bold px-3 py-1 rounded">
                      -{{ product.discount }}%
                    </span>
                  </div>
                  
                  <!-- Wishlist button -->
                  <button class="absolute top-3 right-3 z-10 bg-white rounded-full p-2 shadow-md hover:shadow-lg transition-all duration-200">
                    <Icon name="material-symbols:favorite-outline" class="w-5 h-5 text-gray-600 hover:text-red-500" />
                  </button>
                  
                  <!-- Product image -->
                  <img 
                    :src="product.image" 
                    :alt="product.name"
                    class="w-full h-full object-contain"
                  >
                </div>
                
                <!-- Add to cart button -->
                <div class="px-4 -mt-6 relative z-20">
                  <button 
                    @click="addToCart(product)"
                    class="w-full bg-blue-600 text-white font-medium py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-lg"
                    :class="isInCart(product.id) ? 'bg-gray-600 hover:bg-gray-700' : ''"
                    :disabled="isInCart(product.id)"
                  >
                    <span v-if="isInCart(product.id)">Added to cart</span>
                    <span v-else>Add to cart</span>
                  </button>
                </div>
                
                <!-- Product info section -->
                <div class="p-4 pt-8">
                  <!-- Rating stars -->
                  <div class="flex items-center mb-2">
                    <Icon v-for="i in 5" :key="i" name="material-symbols:star" class="w-4 h-4 text-yellow-400 fill-current" />
                  </div>
                  
                  <!-- Product name -->
                  <h3 class="font-medium text-gray-900 text-sm mb-2">{{ product.name }}</h3>
                  
                  <!-- Pricing -->
                  <div class="flex items-center gap-2">
                    <span class="text-lg font-bold text-gray-900">
                      ${{ product.price.toFixed(2) }}
                    </span>
                    <span v-if="product.discount" class="text-sm text-gray-400 line-through">
                      ${{ (product.price / (1 - product.discount/100)).toFixed(2) }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    <!-- Features Section -->
    <section class="py-16">
      <div class="max-w-6xl mx-auto px-4">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          <div class="text-left p-6 bg-secondary-100 rounded-lg ">
              <div class="w-16 h-16 mb-4 rounded-full flex items-center justify-left">
              <Icon name="heroicons:truck" class="w-12 h-12 bg-secondary-600" />
            </div>
            <h3 class="font-bold text-gray-900 mb-2">Free Shipping</h3>
            <p class="text-gray-600 text-sm">For orders over $99</p>
          </div>
          
          <div class="text-left p-6 bg-secondary-100 rounded-lg ">
              <div class="w-16 h-16 mb-4 rounded-full flex items-center justify-left">
              <Icon name="heroicons:arrow-path" class="w-12 h-12 bg-secondary-600" />
            </div>
            <h3 class="font-bold text-gray-900 mb-2">Money-back</h3>
            <p class="text-gray-600 text-sm">30 days guarantee</p>
          </div>
          
          <div class="text-left p-6 bg-secondary-100 rounded-lg ">
              <div class="w-16 h-16 mb-4 rounded-full flex items-center justify-left">
              <Icon name="heroicons:shield-check" class="w-12 h-12 bg-secondary-600" />
            </div>
            <h3 class="font-bold text-gray-900 mb-2">Secure Payments</h3>
            <p class="text-gray-600 text-sm">Secured by Stripe</p>
          </div>
          
          <div class="text-left p-6 bg-secondary-100 rounded-lg ">
              <div class="w-16 h-16 mb-4 rounded-full flex items-center justify-left">
              <Icon name="heroicons:chat-bubble-left-right" class="w-12 h-12 bg-secondary-600"/>
            </div>
            <h3 class="font-bold text-gray-900 mb-2">24/7 Support</h3>
            <p class="text-gray-600 text-sm">Phone and email support</p>
          </div>
          
        </div>
      </div>
    </section>

     <!-- Sale Section -->
     <section class="bg-gray-50">
        <div class="w-full">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-0 items-center">
            <!-- Left side - Image -->
            <div class="relative h-full">
              <img 
                src="https://i.blogs.es/cac4a7/portada-alfombras/1366_2000.jpeg" 
                alt="Sale furniture" 
                class="w-full h-full object-cover lg:min-h-[600px]"
              >
            </div>
            
            <!-- Right side - Content -->
            <div class="relative p-12 lg:p-20">
              <div class="text-blue-600 font-semibold mb-4 text-sm uppercase tracking-wider">
                Sale up to 35% off
              </div>
              <h2 class="text-4xl lg:text-5xl font-light text-gray-900 mb-6 leading-tight">
                HUNDREDS of<br/>
                New lower prices!
              </h2>
              <p class="text-gray-600 mb-8 leading-relaxed max-w-md">
                It's more affordable than ever to give every room in your home a stylish makeover
              </p>
              <NuxtLink 
                to="/sale" 
                class="inline-flex items-center text-gray-900 font-medium hover:text-gray-700 transition-colors group"
              >
                <span class="border-b border-gray-900 pb-1">Shop Now</span>
                <Icon name="material-symbols:arrow-forward" class="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </NuxtLink>
            </div>
          </div>
        </div>
      </section>

     <!-- Articles Section -->
     <section class="py-16 bg-white">
        <div class="max-w-6xl mx-auto px-4">
          <!-- Section Header -->
          <div class="flex justify-between items-center mb-8">
            <h2 class="text-3xl font-bold text-gray-900">Articles</h2>
            <NuxtLink to="/articles" class="text-gray-600 hover:text-gray-900 font-medium flex items-center gap-2">
              More Articles
              <Icon name="material-symbols:arrow-forward" class="w-5 h-5" />
            </NuxtLink>
          </div>

          <!-- Articles Grid -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <!-- Article 1 -->
            <article class="group cursor-pointer">
              <NuxtLink to="/articles/7-ways-to-decor-your-home">
                <div class="relative overflow-hidden rounded-2xl mb-4">
                  <img 
                    src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80" 
                    alt="7 ways to decor your home"
                    class="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  >
                </div>
                <h3 class="text-xl font-semibold text-gray-900 mb-3 group-hover:text-gray-700 transition-colors">
                  7 ways to decor your home
                </h3>
                <div class="flex items-center text-gray-600 hover:text-gray-900 transition-colors">
                  <span class="font-medium">Read More</span>
                  <Icon name="material-symbols:arrow-forward" class="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </NuxtLink>
            </article>

            <!-- Article 2 -->
            <article class="group cursor-pointer">
              <NuxtLink to="/articles/kitchen-organization">
                <div class="relative overflow-hidden rounded-2xl mb-4">
                  <img 
                    src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80" 
                    alt="Kitchen organization"
                    class="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  >
                </div>
                <h3 class="text-xl font-semibold text-gray-900 mb-3 group-hover:text-gray-700 transition-colors">
                  Kitchen organization
                </h3>
                <div class="flex items-center text-gray-600 hover:text-gray-900 transition-colors">
                  <span class="font-medium">Read More</span>
                  <Icon name="material-symbols:arrow-forward" class="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </NuxtLink>
            </article>

            <!-- Article 3 -->
            <article class="group cursor-pointer">
              <NuxtLink to="/articles/decor-your-bedroom">
                <div class="relative overflow-hidden rounded-2xl mb-4">
                  <img 
                    src="https://images.unsplash.com/photo-1616594039964-ae9521a996c0?w=800&q=80" 
                    alt="Decor your bedroom"
                    class="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  >
                </div>
                <h3 class="text-xl font-semibold text-gray-900 mb-3 group-hover:text-gray-700 transition-colors">
                  Decor your bedroom
                </h3>
                <div class="flex items-center text-gray-600 hover:text-gray-900 transition-colors">
                  <span class="font-medium">Read More</span>
                  <Icon name="material-symbols:arrow-forward" class="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </NuxtLink>
            </article>
          </div>
        </div>
      </section>

     <!-- Newsletter -->
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
            <form @submit.prevent class="relative">
              <div class="flex items-center border-b border-gray-400 pb-3">
                <Icon name="material-symbols:mail-outline" class="w-6 h-6 text-gray-300 mr-3" />
                <input 
                  type="email" 
                  placeholder="Email address" 
                  class="flex-1 bg-transparent outline-none text-white placeholder-gray-400 text-lg"
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
  </div>
</template>

<script setup lang="ts">
import type { Product } from '~/types/product'

// Definir el layout a usar
definePageMeta({
layout: 'default'
})

const productsStore = useProductsStore()
const cartStore = useCartStore()

const { getNewArrivals } = productsStore
const { addItem, isInCart } = cartStore

const loading = ref<boolean>(true)
const newArrivals = ref<Product[]>([])
const currentSlide = ref(0)

// Carousel data
const carouselSlides = ref([
{
  id: 1,
  title: "Transform Your Space, Elevate Your Life",
  description: "VisioCre8te is a gift & decoration store based in HCMC, Vietnam. Est since 2019.",
  image: "https://mueblesnudecor.com/wp-content/uploads/2023/02/diseno-interiores-sala-estar-moderna-mediados-siglo-arbol-monstera1-scaled.jpg",
  link: "/shop"
},
{
  id: 2,
  title: "New Arrivals Collection",
  description: "Discover our latest furniture pieces designed to make your home extraordinary.",
  image: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=800&q=80",
  link: "/shop?category=new"
},
{
  id: 3,
  title: "Minimalist Living Room Sets",
  description: "Create a serene atmosphere with our carefully curated minimalist furniture.",
  image: "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=800&q=80",
  link: "/shop?category=living-room"
},
{
  id: 4,
  title: "Comfort Meets Style",
  description: "Experience the perfect blend of comfort and modern aesthetics.",
  image: "https://images.unsplash.com/photo-1550581190-9c1c48d21d6c?w=800&q=80",
  link: "/shop?category=bedroom"
}
])

// Carousel navigation
const nextSlide = () => {
currentSlide.value = (currentSlide.value + 1) % carouselSlides.value.length
// Reset autoplay timer when user interacts
stopAutoPlay()
startAutoPlay()
}

const previousSlide = () => {
currentSlide.value = currentSlide.value === 0 
  ? carouselSlides.value.length - 1 
  : currentSlide.value - 1
// Reset autoplay timer when user interacts
stopAutoPlay()
startAutoPlay()
}

// Auto-play carousel
let intervalId: NodeJS.Timeout | null = null

const startAutoPlay = () => {
intervalId = setInterval(() => {
  nextSlide()
}, 5000) // Change slide every 5 seconds
}

const stopAutoPlay = () => {
if (intervalId) {
  clearInterval(intervalId)
  intervalId = null
}
}

onMounted(async () => {
newArrivals.value = getNewArrivals(5) as unknown as Product[]
loading.value = false
startAutoPlay()
})

onUnmounted(() => {
stopAutoPlay()
})

const addToCart = (product: Product): void => {
  if (!isInCart(product.id)) {
    addItem(product)
  }
}

useHead({
  title: 'VistaCreate - Transform Your Space, Elevate Your Life',
  meta: [
    { name: 'description', content: 'Premium furniture and home decor. Transform your space with our curated collection of modern furniture.' }
  ]
})
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  line-clamp: 2;  /* Propiedad estándar */
  overflow: hidden;
}

/* Carousel Transitions */
.slide-enter-active,
.slide-leave-active {
  transition: opacity 0.4s ease, transform 0.4s ease;
}

.slide-enter-from {
  opacity: 0;
  transform: translateX(30px);
}

.slide-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}

/* Prevent layout shift */
.slide-leave-active {
  position: absolute;
  width: 100%;
}

/* Transición suave para el contenido de texto */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease-in-out;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

/* Usar las sombras personalizadas del sistema */
.shadow-medium {
  box-shadow: var(--shadow-medium);
}

/* Smooth image loading */
img {
  background-color: #f3f4f6;
}
</style>