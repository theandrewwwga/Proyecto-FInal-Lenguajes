// Methods for view modes
const setViewMode = (mode: string) => {
  viewMode.value = mode
  
  // Change layout based on button clicked
  if (mode === 'grid') {
    currentView.value = 'sidebar'
  } else if (mode === 'large') {
    currentView.value = 'dropdown'
  } else if (mode === 'small') {
    currentView.value = 'sidebar'
  } else if (mode === 'list') {
    currentView.value = 'list'
  }
}<template>
  <div>
    <!-- Hero Section -->
    <section class="py-8">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="relative rounded-2xl overflow-hidden h-64">
          <!-- Background Image -->
          <img 
            src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1920&q=80" 
            alt="Shop background" 
            class="w-full h-full object-cover"
          >
          <div class="absolute inset-0 bg-black/40"></div>
          <!-- Content -->
          <div class="absolute inset-0 flex items-center justify-center text-center">
            <div>
              <nav class="flex justify-center space-x-2 text-sm mb-4">
                <NuxtLink to="/" class="text-white/80 hover:text-white">Home</NuxtLink>
                <span class="text-white/60">/</span>
                <span class="text-white">Shop</span>
              </nav>
              <h1 class="text-4xl font-light text-white mb-2">Shop</h1>
              <p class="text-white/90">Let's design the place you always imagined.</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Main Content -->
    <section class="py-12">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Category Header -->
        <div class="mb-6">
          <h2 class="text-2xl font-medium text-gray-900">
            {{ currentCategoryName }}
          </h2>
          <p class="text-gray-600 mt-1">{{ filteredProducts.length }} products</p>
        </div>

        <!-- Filters Row -->
        <div class="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
          <!-- Left side filters -->
          <div class="flex flex-col sm:flex-row gap-4">
            <!-- Desktop Filter Button (Variation 1) -->
            <button 
              v-if="!showMobileFilters"
              @click="showSidebarFilter = !showSidebarFilter"
              class="hidden md:flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Icon name="material-symbols:filter-list" class="w-5 h-5" />
              <span>Filter</span>
            </button>
          </div>

          <!-- Right side - Sort and View options -->
          <div class="flex items-center gap-4">
            <select v-model="sortBy" class="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-500">
              <option value="featured">Sort by</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="newest">Newest</option>
            </select>
            <div class="flex gap-2">
              <button 
                @click="setViewMode('grid')"
                :class="[viewMode === 'grid' ? 'text-gray-900' : 'text-gray-400']"
                class="p-2 hover:text-gray-900 transition-colors"
                title="Grid view with sidebar"
              >
                <Icon name="material-symbols:grid-view" class="w-5 h-5" />
              </button>
              <button 
                @click="setViewMode('large')"
                :class="[viewMode === 'large' ? 'text-gray-900' : 'text-gray-400']"
                class="p-2 hover:text-gray-900 transition-colors"
                title="Grid view with dropdown filters"
              >
                <Icon name="material-symbols:view-module" class="w-5 h-5" />
              </button>
              <button 
                @click="setViewMode('small')"
                :class="[viewMode === 'small' ? 'text-gray-900' : 'text-gray-400']"
                class="p-2 hover:text-gray-900 transition-colors"
                title="Two column layout"
              >
                <Icon name="material-symbols:view-comfy" class="w-5 h-5" />
              </button>
              <button 
                @click="setViewMode('list')"
                :class="[viewMode === 'list' ? 'text-gray-900' : 'text-gray-400']"
                class="p-2 hover:text-gray-900 transition-colors"
                title="List view"
              >
                <Icon name="material-symbols:view-list" class="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        <!-- Products Grid -->
        <div class="flex gap-8">
          <!-- Sidebar Filter (for grid and small views) -->
          <aside v-if="(currentView === 'sidebar' || currentView === 'list') && viewMode !== 'large'" class="hidden md:block w-64 flex-shrink-0">
            <div class="sticky top-24">
              <h3 class="font-medium text-gray-900 mb-4">CATEGORIES</h3>
              <div class="space-y-2 mb-8">
                <label 
                  v-for="cat in [{ value: '', label: 'All Rooms' }, ...categories]"
                  :key="cat.value"
                  class="flex items-center cursor-pointer"
                  @click="selectedCategory = cat.value"
                >
                  <span :class="selectedCategory === cat.value ? 'text-gray-900 font-medium' : 'text-gray-600'">
                    {{ cat.label }}
                  </span>
                </label>
              </div>

              <h3 class="font-medium text-gray-900 mb-4">PRICE</h3>
              <div class="space-y-3">
                <label 
                  v-for="price in priceRanges"
                  :key="price.value"
                  class="flex items-center cursor-pointer"
                  @click="selectedPrice = price.value"
                >
                  <input 
                    type="checkbox" 
                    :checked="selectedPrice === price.value"
                    class="mr-3 rounded border-gray-300"
                  >
                  <span :class="selectedPrice === price.value ? 'text-gray-900 font-medium' : 'text-gray-600'">
                    {{ price.label }}
                  </span>
                </label>
              </div>
            </div>
          </aside>

          <!-- Products -->
          <div class="flex-1">
            <!-- Dropdown Filters (for large view) -->
            <div v-if="currentView === 'dropdown'" class="flex gap-4 mb-6">
              <div class="relative">
                <button 
                  @click="showCategoryDropdown = !showCategoryDropdown"
                  class="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors min-w-[180px]"
                >
                  <span>{{ currentCategoryName }}</span>
                  <Icon name="material-symbols:keyboard-arrow-down" class="w-5 h-5 ml-auto" />
                </button>
                <div v-if="showCategoryDropdown" class="absolute top-full mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                  <button 
                    v-for="cat in [{ value: '', label: 'All Rooms' }, ...categories]"
                    :key="cat.value"
                    @click="selectCategory(cat.value)"
                    class="block w-full text-left px-4 py-2 hover:bg-gray-50 transition-colors"
                  >
                    {{ cat.label }}
                  </button>
                </div>
              </div>

              <div class="relative">
                <button 
                  @click="showPriceDropdown = !showPriceDropdown"
                  class="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors min-w-[180px]"
                >
                  <span>{{ selectedPriceLabel || 'All Price' }}</span>
                  <Icon name="material-symbols:keyboard-arrow-down" class="w-5 h-5 ml-auto" />
                </button>
                <div v-if="showPriceDropdown" class="absolute top-full mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                  <button 
                    v-for="price in priceRanges" 
                    :key="price.value"
                    @click="selectPrice(price.value, price.label)"
                    class="block w-full text-left px-4 py-2 hover:bg-gray-50 transition-colors"
                  >
                    {{ price.label }}
                  </button>
                </div>
              </div>
            </div>

            <!-- Product Grid -->
            <div 
              :class="[
                'grid gap-6',
                viewMode === 'small' || viewMode === 'list' ? 'grid-cols-1 md:grid-cols-2' : 
                'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
              ]"
            >
              <div 
                v-for="product in filteredProducts" 
                :key="product.id"
                :class="viewMode === 'small' || viewMode === 'list' ? 'flex gap-4' : ''"
              >
                <!-- List/Small View Layout -->
                <template v-if="viewMode === 'small' || viewMode === 'list'">
                  <!-- Product Image -->
                  <div class="w-1/3 flex-shrink-0">
                    <div class="bg-gray-50 rounded-lg overflow-hidden aspect-square relative">
                      <img 
                        :src="product.image" 
                        :alt="product.name"
                        class="w-full h-full object-cover"
                      >
                      <div v-if="product.discount" class="absolute top-2 left-2 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                        -{{ product.discount }}%
                      </div>
                    </div>
                  </div>
                  
                  <!-- Product Info -->
                  <div class="flex-1 flex flex-col">
                    <!-- Stars -->
                    <div class="flex items-center gap-1 mb-2">
                      <Icon v-for="i in 5" :key="i" name="material-symbols:star" class="w-4 h-4 text-gray-900" />
                    </div>
                    
                    <!-- Name -->
                    <h3 class="font-medium text-gray-900 mb-2">{{ product.name }}</h3>
                    
                    <!-- Price -->
                    <div class="mb-3">
                      <span class="text-lg font-medium text-gray-900">
                        ${{ (product.price * (1 - (product.discount || 0) / 100)).toFixed(2) }}
                      </span>
                      <span v-if="product.originalPrice" class="text-gray-500 line-through ml-2">
                        ${{ product.originalPrice.toFixed(2) }}
                      </span>
                    </div>
                    
                    <!-- Description -->
                    <p class="text-gray-600 text-sm mb-4 line-clamp-2">
                      {{ product.description || 'Beautiful furniture piece perfect for your home.' }}
                    </p>
                    
                    <!-- Buttons -->
                    <div class="mt-auto space-y-2">
                      <button 
                        @click="addToCart(product)"
                        class="w-full bg-gray-900 text-white py-2 rounded-lg hover:bg-gray-800 transition-colors"
                      >
                        Add to cart
                      </button>
                      <button 
                        @click="toggleWishlist(product.id)"
                        class="w-full flex items-center justify-center gap-2 py-2 text-gray-700 hover:text-gray-900 transition-colors"
                      >
                        <Icon 
                          :name="wishlist.includes(product.id) ? 'material-symbols:favorite' : 'material-symbols:favorite-outline'" 
                          class="w-5 h-5"
                          :class="wishlist.includes(product.id) ? 'text-red-500' : ''"
                        />
                        <span>Wishlist</span>
                      </button>
                    </div>
                  </div>
                </template>

                <!-- Grid View Layout -->
                <template v-else>
                  <div class="group relative">
                    <div class="bg-gray-50 rounded-lg overflow-hidden aspect-square mb-4 relative">
                      <img 
                        :src="product.image" 
                        :alt="product.name"
                        class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      >
                      <div v-if="product.discount" class="absolute top-4 left-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                        NEW<br>-{{ product.discount }}%
                      </div>
                      <button 
                        @click="addToCart(product)"
                        class="absolute bottom-4 left-1/2 -translate-x-1/2 bg-gray-900 text-white px-6 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      >
                        Add to cart
                      </button>
                    </div>
                    <div class="flex items-center gap-1 mb-1">
                      <Icon v-for="i in 5" :key="i" name="material-symbols:star" class="w-4 h-4 text-gray-900" />
                    </div>
                    <h3 class="font-medium text-gray-900 mb-1">{{ product.name }}</h3>
                    <p class="text-gray-900 font-medium">
                      ${{ (product.price * (1 - (product.discount || 0) / 100)).toFixed(2) }}
                      <span v-if="product.originalPrice" class="text-gray-500 line-through ml-2">
                        ${{ product.originalPrice.toFixed(2) }}
                      </span>
                    </p>
                  </div>
                </template>
              </div>
            </div>

            <!-- Show More Button -->
            <div class="text-center mt-12">
              <button class="px-8 py-3 border border-gray-300 rounded-full hover:bg-gray-50 transition-colors">
                Show more
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Newsletter Section -->
    <NewsletterSection />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useCartStore } from '~/stores/cart'
import NewsletterSection from '~/components/layout/NewsletterSection.vue'

const cartStore = useCartStore()
const nuxtApp = useNuxtApp()

// Variation controls
const currentView = ref<'sidebar' | 'dropdown' | 'list'>('sidebar')
const viewMode = ref('grid')
const wishlist = ref<number[]>([])
const showSidebarFilter = ref(true)
const showMobileFilters = ref(false)
// Filter states
const selectedCategory = ref('living-room')
const selectedPrice = ref('')
const selectedPriceLabel = ref('')
const sortBy = ref('featured')
// Dropdown states
const showCategoryDropdown = ref(false)
const showPriceDropdown = ref(false)

// Data
const categories = [
  { value: 'living-room', label: 'Living Room' },
  { value: 'bedroom', label: 'Bedroom' },
  { value: 'kitchen', label: 'Kitchen' },
  { value: 'bathroom', label: 'Bathroom' },
  { value: 'dining', label: 'Dining' },
  { value: 'outdoor', label: 'Outdoor' }
]

const priceRanges = [
  { value: '', label: 'All Price' },
  { value: '0-100', label: '$0 - $100' },
  { value: '100-200', label: '$100 - $200' },
  { value: '200-300', label: '$200 - $300' },
  { value: '300+', label: '$300+' }
]

const products = ref([
  {
    id: 1,
    name: 'Loveseat Sofa',
    price: 199.00,
    originalPrice: 400.00,
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&q=80',
    discount: 50,
    description: 'Super-soft cushion cover in off-white with a tactile pattern that enhances the different tones in the pile and base.'
  },
  {
    id: 2,
    name: 'Luxury Sofa',
    price: 299.00,
    originalPrice: 500.00,
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&q=80',
    discount: 50
  },
  {
    id: 3,
    name: 'Table Lamp',
    price: 19.99,
    image: 'https://images.unsplash.com/photo-1565636192335-f5c4e2e5a5f3?w=400&q=80',
    discount: 50,
    description: 'Like small jewels in shiny brass and gray clear glass, preset a soft mood light that creates exciting shadows on walls and ceilings.'
  },
  {
    id: 4,
    name: 'Cozy Sofa',
    price: 299.00,
    image: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=400&q=80',
    discount: 50,
    description: 'Easy transportation was the goal when we created this comfy loveseat with durable beige polyester fabric.'
  },
  {
    id: 5,
    name: 'White Drawer unit',
    price: 89.99,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80',
    discount: 50,
    description: 'Super-soft cushion cover in off-white with a tactile pattern that enhances the different tones in the pile and base.'
  },
  {
    id: 6,
    name: 'Black Tray table',
    price: 19.99,
    image: 'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=400&q=80',
    discount: 50,
    description: 'Easy to love at a price that\'s hard to resist. Buy one or buy a few and make every space where you sit more convenient.'
  },
  {
    id: 7,
    name: 'Lamp',
    price: 39.00,
    image: 'https://images.unsplash.com/photo-1507746212228-2d3645cbeb56?w=400&q=80',
    discount: 50
  },
  {
    id: 8,
    name: 'Black Brow Side table',
    price: 16.99,
    image: 'https://images.unsplash.com/photo-1530018607912-eff2daa1bac4?w=400&q=80',
    discount: 50
  },
  {
    id: 9,
    name: 'Light Beige Pillow',
    price: 3.99,
    image: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=400&q=80',
    discount: 50
  },
  {
    id: 10,
    name: 'Table Lamp',
    price: 39.99,
    image: 'https://images.unsplash.com/photo-1565636192335-f5c4e2e5a5f3?w=400&q=80',
    discount: 50
  },
  {
    id: 11,
    name: 'Bamboo Basket',
    price: 9.99,
    image: 'https://images.unsplash.com/photo-1554995207-c18c203602cb?w=400&q=80',
    discount: 50,
    description: 'With its soft shape and color, this spacious basket is just as decorative wherever you choose to put it.'
  },
  {
    id: 12,
    name: 'Off-white Pillow',
    price: 7.99,
    image: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=400&q=80',
    discount: 50
  }
])

// Methods
const addToCart = (product: any) => {
  // Create a Product object that matches the expected type
  const productData = {
    id: product.id,
    name: product.name,
    description: product.description || '',
    price: product.price,
    category: 'furniture',
    image: product.image,
    images: [product.image], // Array of images
    stock: 10,
    featured: true,
    isNew: true,
    discount: product.discount || 0,
    rating: 5,
    reviewCount: 0,
    specifications: [],
    colors: [],
    sizes: [],
    variants: [],
    tags: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
  
  cartStore.addItem(productData)
  nuxtApp.$bus.$emit('toggle-cart-sidebar')
}

const toggleWishlist = (productId: number) => {
  const index = wishlist.value.indexOf(productId)
  if (index > -1) {
    wishlist.value.splice(index, 1)
  } else {
    wishlist.value.push(productId)
  }
}

const selectCategory = (value: string) => {
  selectedCategory.value = value
  showCategoryDropdown.value = false
}

const selectPrice = (value: string, label: string) => {
  selectedPrice.value = value
  selectedPriceLabel.value = label
  showPriceDropdown.value = false
}

// Click outside to close dropdowns
onMounted(() => {
  document.addEventListener('click', (e) => {
    const target = e.target as HTMLElement
    if (!target.closest('.dropdown')) {
      showCategoryDropdown.value = false
      showPriceDropdown.value = false
    }
  })
})


const setViewMode = (mode: 'grid' | 'list' | 'large' | 'small' ) => {
  viewMode.value = mode
}

// Computed properties
const currentCategoryName = computed(() => {
  const category = categories.find(cat => cat.value === selectedCategory.value)
  return category ? category.label : 'All Products'
})

const filteredProducts = computed(() => {
  return products.value
})

// Click outside to close dropdowns
useHead({
  title: 'Shop - VisioCreate'
})
</script>

<style scoped>
/* Custom styles for better alignment */
.aspect-square {
  aspect-ratio: 1 / 1;
}
</style>