// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  typescript: {
    strict: true,
    typeCheck: true
  },
  devServer: {
    port: 3001 // Change Nuxt to 3001
  },
  runtimeConfig: {
    public: {
      apiBaseUrl: 'http://localhost:3001'
    }
  }
})
