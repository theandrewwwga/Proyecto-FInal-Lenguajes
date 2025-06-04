<template>
  <div>
    <!-- Breadcrumb -->
    <section class="py-6 border-b">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav class="flex items-center space-x-2 text-sm">
          <NuxtLink to="/" class="text-gray-500 hover:text-gray-700">Home</NuxtLink>
          <span class="text-gray-400">/</span>
          <NuxtLink to="/blog" class="text-gray-500 hover:text-gray-700">Blog</NuxtLink>
          <span class="text-gray-400">/</span>
          <span class="text-gray-900">{{ post.title }}</span>
        </nav>
      </div>
    </section>

    <!-- Article Content -->
    <article class="py-12">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Article Header -->
        <header class="mb-8">
          <h1 class="text-4xl font-light text-gray-900 mb-4">{{ post.title }}</h1>
          <div class="flex items-center gap-6 text-sm text-gray-500">
            <div class="flex items-center gap-2">
              <Icon name="material-symbols:person-outline" class="w-4 h-4" />
              <span>{{ post.author }}</span>
            </div>
            <div class="flex items-center gap-2">
              <Icon name="material-symbols:calendar-today" class="w-4 h-4" />
              <time>{{ post.date }}</time>
            </div>
          </div>
        </header>

        <!-- Featured Image -->
        <div class="mb-12">
          <img 
            :src="post.featuredImage" 
            :alt="post.title"
            class="w-full rounded-lg"
          >
        </div>

        <!-- Article Text -->
        <div class="prose prose-lg max-w-none mb-12">
          <p class="text-gray-600 leading-relaxed mb-6">
            {{ post.intro }}
          </p>

          <h2 class="text-2xl font-medium text-gray-900 mt-8 mb-4">{{ post.sections[0].title }}</h2>
          <p class="text-gray-600 leading-relaxed mb-6">
            {{ post.sections[0].content }}
          </p>

          <!-- Gallery Grid -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
            <img 
              v-for="(image, index) in post.galleryImages"
              :key="index"
              :src="image" 
              :alt="`Gallery image ${index + 1}`"
              class="w-full rounded-lg"
            >
          </div>

          <h2 class="text-2xl font-medium text-gray-900 mt-8 mb-4">{{ post.sections[1].title }}</h2>
          <p class="text-gray-600 leading-relaxed mb-6">
            {{ post.sections[1].content }}
          </p>

          <h2 class="text-2xl font-medium text-gray-900 mt-8 mb-4">{{ post.sections[2].title }}</h2>
          <p class="text-gray-600 leading-relaxed mb-6">
            {{ post.sections[2].content }}
          </p>
        </div>

        <!-- Highlight Box -->
        <div class="bg-gray-100 rounded-lg p-8 mb-12">
          <h3 class="text-xl font-medium text-gray-900 mb-4">{{ post.highlight.title }}</h3>
          <p class="text-gray-600 leading-relaxed mb-4">
            {{ post.highlight.content }}
          </p>
          <h4 class="text-lg font-medium text-gray-900 mb-3">{{ post.highlight.subtitle }}</h4>
          <p class="text-gray-600 leading-relaxed">
            {{ post.highlight.subcontent }}
          </p>
          <!-- Dark Image -->
          <div class="mt-6">
            <img 
              :src="post.highlight.image" 
              :alt="post.highlight.title"
              class="w-full rounded-lg"
            >
          </div>
        </div>
      </div>
    </article>

    <!-- Related Articles -->
    <section class="py-12 bg-gray-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between mb-8">
          <h2 class="text-2xl font-medium text-gray-900">You might also like</h2>
          <NuxtLink to="/blog" class="text-gray-600 hover:text-gray-900 flex items-center gap-1">
            More Articles
            <Icon name="material-symbols:arrow-forward" class="w-4 h-4" />
          </NuxtLink>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <article v-for="article in relatedArticles" :key="article.id">
            <NuxtLink :to="`/blog/${article.slug}`" class="group">
              <div class="aspect-[4/3] rounded-lg overflow-hidden mb-4">
                <img 
                  :src="article.image" 
                  :alt="article.title"
                  class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                >
              </div>
              <h3 class="text-lg font-medium text-gray-900 mb-2 group-hover:text-gray-600 transition-colors">
                {{ article.title }}
              </h3>
              <time class="text-sm text-gray-500">{{ article.date }}</time>
            </NuxtLink>
          </article>
        </div>
      </div>
    </section>

    <!-- Newsletter Section -->
    <NewsletterSection />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import NewsletterSection from '~/components/layout/NewsletterSection.vue'

const route = useRoute()

// In a real app, this would fetch data based on the slug
const post = ref({
  id: 1,
  slug: route.params.slug,
  title: 'How to make a busy bathroom a place to relax',
  author: 'Henrik Annemark',
  date: 'October 16, 2023',
  featuredImage: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=1200&q=80',
  intro: 'Your bathroom serves a string of busy functions on a daily basis. See how you can make all of them work, and still have room for comfort and relaxation.',
  sections: [
    {
      title: 'A cleaning hub with built-in ventilation',
      content: 'Use a rod and a shower curtain to create a complement to your cleaning cupboard. Unsightly equipment is stored out of sight yet accessibly close – while the air flow helps dry any dampness.'
    },
    {
      title: 'Storage with a calming effect',
      content: 'Having a lot to store doesn\'t mean it has to look chaotic. Many bathroom items are better kept out in the open – either to be close at hand or are nice to look at. Add a plant or two to set a calm mood for the entire room (and they\'ll thrive in the humid air).'
    },
    {
      title: 'Kit your clutter for easy access',
      content: 'Even if you have a cabinet ready to swallow the clutter, it\'s worth resisting a little. Let containers hold kits for different activities – home spa, make-up, personal hygiene – to bring out or put back at a moment\'s notice.'
    }
  ],
  galleryImages: [
    'https://images.unsplash.com/photo-1564540586988-aa4e53c3d799?w=600&q=80',
    'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=600&q=80'
  ],
  highlight: {
    title: 'An ecosystem of towels',
    content: 'Spread not only warmth but also style with towel racks and towel holders. They are quick and the need for frequent washing is minimized.',
    subtitle: 'Make your mop disappear',
    subcontent: 'Having your cleaning tools organized makes them easier to both use and return to – which means your everyday chore routine won\'t feel like a slog of mind it brings.',
    image: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=800&q=80'
  }
})

// Related articles
const relatedArticles = ref([
  {
    id: 2,
    title: 'Modern texas home is beautiful and completely kid-friendly',
    image: 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=600&q=80',
    date: 'October 16, 2023',
    slug: 'modern-texas-home-kid-friendly'
  },
  {
    id: 3,
    title: 'Modern texas home is beautiful and completely kid-friendly',
    image: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=600&q=80',
    date: 'October 16, 2023',
    slug: 'modern-texas-home-kid-friendly-2'
  },
  {
    id: 4,
    title: 'Modern texas home is beautiful and completely kid-friendly',
    image: 'https://images.unsplash.com/photo-1565182999561-18d7dc61c393?w=600&q=80',
    date: 'October 16, 2023',
    slug: 'modern-texas-home-kid-friendly-3'
  }
])

useHead({
  title: `${post.value.title} - VisioCreate Blog`
})
</script>

<style scoped>
/* Prose styles for article content */
.prose {
  color: #374151;
  max-width: 65ch;
}

.prose p {
  margin-bottom: 1.5rem;
  line-height: 1.75;
}

.prose h2 {
  margin-top: 2rem;
  margin-bottom: 1rem;
}

/* Aspect ratio */
.aspect-\[4\/3\] {
  aspect-ratio: 4 / 3;
}
</style>