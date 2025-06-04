export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  modules: [
    '@nuxt/ui',
    '@pinia/nuxt',
    '@nuxt/icon',
  ],
  components: {
    global: true,
    dirs: [
      '~/components',
      '~/components/layout',
      '~/components/cart'
    ]
  },
  runtimeConfig: {
    public: {
      apiBase: process.env.API_BASE_URL || 'http://localhost:5050/api'
    }
  },
  pinia: {
    storesDirs: ['./stores/**'],
  },
})