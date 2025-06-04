<template>
    <div>
      <!-- Hero Section -->
      <section class="py-8">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="relative rounded-2xl overflow-hidden h-64 bg-gray-200">
            <!-- Diagonal Pattern Background -->
            <div class="absolute inset-0" style="background-image: repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(255,255,255,.1) 35px, rgba(255,255,255,.1) 70px);"></div>
            
            <!-- Content -->
            <div class="relative h-full flex items-center justify-center text-center">
              <div>
                <nav class="flex justify-center space-x-2 text-sm mb-4">
                  <NuxtLink to="/" class="text-gray-600 hover:text-gray-900">Home</NuxtLink>
                  <span class="text-gray-400">/</span>
                  <span class="text-gray-900">Blog</span>
                </nav>
                <h1 class="text-4xl font-light text-gray-900 mb-2">Our Blog</h1>
                <p class="text-gray-600">Home ideas and design inspiration</p>
              </div>
            </div>
          </div>
        </div>
      </section>
  
      <!-- Blog Content -->
      <section class="py-12">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <!-- Filter and Sort Row -->
          <div class="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
            <!-- Tabs -->
            <div class="flex gap-6">
              <button 
                @click="activeTab = 'all'"
                :class="[activeTab === 'all' ? 'text-gray-900 border-b-2 border-gray-900' : 'text-gray-500 hover:text-gray-700']"
                class="pb-2 font-medium transition-colors"
              >
                All Blog
              </button>
              <button 
                @click="activeTab = 'featured'"
                :class="[activeTab === 'featured' ? 'text-gray-900 border-b-2 border-gray-900' : 'text-gray-500 hover:text-gray-700']"
                class="pb-2 font-medium transition-colors"
              >
                Featured
              </button>
            </div>
  
            <!-- Right side - Sort and View options -->
            <div class="flex items-center gap-4">
              <select v-model="sortBy" class="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-500">
                <option value="newest">Sort by</option>
                <option value="oldest">Oldest</option>
                <option value="popular">Most Popular</option>
              </select>
              <div class="flex gap-2">
                <button 
                  @click="viewMode = 'grid'"
                  :class="[viewMode === 'grid' ? 'text-gray-900' : 'text-gray-400']"
                  class="p-2 hover:text-gray-900 transition-colors"
                >
                  <Icon name="material-symbols:grid-view" class="w-5 h-5" />
                </button>
                <button 
                  @click="viewMode = 'large'"
                  :class="[viewMode === 'large' ? 'text-gray-900' : 'text-gray-400']"
                  class="p-2 hover:text-gray-900 transition-colors"
                >
                  <Icon name="material-symbols:view-module" class="w-5 h-5" />
                </button>
                <button 
                  @click="viewMode = 'small'"
                  :class="[viewMode === 'small' ? 'text-gray-900' : 'text-gray-400']"
                  class="p-2 hover:text-gray-900 transition-colors"
                >
                  <Icon name="material-symbols:view-comfy" class="w-5 h-5" />
                </button>
                <button 
                  @click="viewMode = 'list'"
                  :class="[viewMode === 'list' ? 'text-gray-900' : 'text-gray-400']"
                  class="p-2 hover:text-gray-900 transition-colors"
                >
                  <Icon name="material-symbols:view-list" class="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
  
          <!-- Blog Grid -->
          <div 
            :class="[
              'grid gap-6',
              viewMode === 'large' ? 'grid-cols-1 md:grid-cols-2' : 
              viewMode === 'small' ? 'grid-cols-2 md:grid-cols-4' :
              viewMode === 'list' ? 'grid-cols-1' :
              'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
            ]"
          >
            <article 
              v-for="post in filteredPosts" 
              :key="post.id"
              :class="viewMode === 'list' ? 'flex gap-6' : ''"
            >
              <!-- List View -->
              <template v-if="viewMode === 'list'">
                <div class="w-1/3 flex-shrink-0">
                  <NuxtLink :to="`/blog/${post.slug}`" class="block">
                    <div class="aspect-[4/3] rounded-lg overflow-hidden">
                      <img 
                        :src="post.image" 
                        :alt="post.title"
                        class="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      >
                    </div>
                  </NuxtLink>
                </div>
                <div class="flex-1">
                  <NuxtLink :to="`/blog/${post.slug}`" class="group">
                    <h2 class="text-xl font-medium text-gray-900 mb-2 group-hover:text-gray-600 transition-colors">
                      {{ post.title }}
                    </h2>
                  </NuxtLink>
                  <p class="text-gray-600 mb-3 line-clamp-2">{{ post.excerpt }}</p>
                  <time class="text-sm text-gray-500">{{ post.date }}</time>
                </div>
              </template>
  
              <!-- Grid View -->
              <template v-else>
                <NuxtLink :to="`/blog/${post.slug}`" class="group">
                  <div class="aspect-[4/3] rounded-lg overflow-hidden mb-4">
                    <img 
                      :src="post.image" 
                      :alt="post.title"
                      class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    >
                  </div>
                  <h2 class="text-lg font-medium text-gray-900 mb-2 group-hover:text-gray-600 transition-colors">
                    {{ post.title }}
                  </h2>
                  <time class="text-sm text-gray-500">{{ post.date }}</time>
                </NuxtLink>
              </template>
            </article>
          </div>
  
          <!-- Show More Button -->
          <div class="text-center mt-12">
            <button 
              @click="loadMore"
              v-if="hasMore"
              class="px-8 py-3 border border-gray-300 rounded-full hover:bg-gray-50 transition-colors"
            >
              Show more
            </button>
          </div>
        </div>
      </section>
  
      <!-- Newsletter Section -->
      <NewsletterSection />
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, computed } from 'vue'
  import NewsletterSection from '~/components/layout/NewsletterSection.vue'
  
  // State
  const activeTab = ref('all')
  const sortBy = ref('newest')
  const viewMode = ref('grid')
  const postsShown = ref(9)
  
  // Blog posts data
  const blogPosts = ref([
    {
      id: 1,
      title: '7 ways to decor your home like a professional',
      excerpt: 'Transform your living space with these professional decorating tips that will make your home look magazine-worthy.',
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&q=80',
      date: 'October 16, 2023',
      slug: '7-ways-to-decor-your-home',
      featured: true
    },
    {
      id: 2,
      title: 'Inside a beautiful kitchen organization',
      excerpt: 'Discover smart storage solutions and organizational tips to keep your kitchen clean, functional, and beautiful.',
      image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80',
      date: 'October 16, 2023',
      slug: 'beautiful-kitchen-organization',
      featured: true
    },
    {
      id: 3,
      title: 'Decor your bedroom for your children',
      excerpt: 'Create a magical and functional bedroom space that your children will love and grow with over the years.',
      image: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?w=600&q=80',
      date: 'October 16, 2023',
      slug: 'decor-bedroom-for-children',
      featured: false
    },
    {
      id: 4,
      title: 'Modern texas home is beautiful and completely kid-friendly',
      excerpt: 'Tour this stunning Texas home that perfectly balances modern design with family-friendly functionality.',
      image: 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=600&q=80',
      date: 'October 16, 2023',
      slug: 'modern-texas-home-kid-friendly',
      featured: false
    },
    {
      id: 5,
      title: 'Modern texas home is beautiful and completely kid-friendly',
      excerpt: 'Another perspective on creating beautiful spaces that work for the whole family without compromising style.',
      image: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=600&q=80',
      date: 'October 16, 2023',
      slug: 'modern-texas-home-kid-friendly-2',
      featured: false
    },
    {
      id: 6,
      title: 'Modern texas home is beautiful and completely kid-friendly',
      excerpt: 'More ideas for designing spaces that are both sophisticated and suitable for family living.',
      image: 'https://images.unsplash.com/photo-1565182999561-18d7dc61c393?w=600&q=80',
      date: 'October 16, 2023',
      slug: 'modern-texas-home-kid-friendly-3',
      featured: false
    },
    {
      id: 7,
      title: 'Modern texas home is beautiful and completely kid-friendly',
      excerpt: 'Continue exploring how modern design principles can create beautiful, livable family homes.',
      image: 'https://images.unsplash.com/photo-1556020685-ae41abfc9365?w=600&q=80',
      date: 'October 16, 2023',
      slug: 'modern-texas-home-kid-friendly-4',
      featured: false
    },
    {
      id: 8,
      title: 'Modern texas home is beautiful and completely kid-friendly',
      excerpt: 'Final tips and tricks for maintaining a stylish home while accommodating the needs of children.',
      image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&q=80',
      date: 'October 16, 2023',
      slug: 'modern-texas-home-kid-friendly-5',
      featured: false
    },
    {
      id: 9,
      title: 'Modern texas home is beautiful and completely kid-friendly',
      excerpt: 'Wrap up our series on family-friendly modern homes with these essential design elements.',
      image: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=600&q=80',
      date: 'October 16, 2023',
      slug: 'modern-texas-home-kid-friendly-6',
      featured: false
    }
  ])
  
  // Computed
  const filteredPosts = computed(() => {
    let posts = activeTab.value === 'featured' 
      ? blogPosts.value.filter(post => post.featured)
      : blogPosts.value
  
    // Sort posts
    if (sortBy.value === 'oldest') {
      posts = [...posts].reverse()
    } else if (sortBy.value === 'popular') {
      // In a real app, you'd sort by view count or similar metric
      posts = [...posts].sort(() => Math.random() - 0.5)
    }
  
    return posts.slice(0, postsShown.value)
  })
  
  const hasMore = computed(() => {
    const totalPosts = activeTab.value === 'featured' 
      ? blogPosts.value.filter(post => post.featured).length
      : blogPosts.value.length
    return postsShown.value < totalPosts
  })
  
  // Methods
  const loadMore = () => {
    postsShown.value += 6
  }
  
  useHead({
    title: 'Blog - VisioCreate'
  })
  </script>
  
  <style scoped>
  /* Custom line clamp for excerpt */
  .line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  line-clamp: 2;  /* Propiedad estándar */
  overflow: hidden;
}
  
  /* Aspect ratio utilities */
  .aspect-\[4\/3\] {
    aspect-ratio: 4 / 3;
  }
  </style>