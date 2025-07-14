import { defineNuxtConfig } from 'nuxt/config'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: false },
  ssr: false,
  modules: [
    '@nuxt/eslint',
    '@nuxtjs/tailwindcss',
    '@vite-pwa/nuxt',
  ],
  app: {
    head: {
      meta: [
        { name: 'theme-color', content: '#EA1D2C' },
        { name: 'apple-mobile-web-app-capable', content: 'yes' },
        { name: 'apple-mobile-web-app-status-bar-style', content: 'default' },
        { name: 'apple-mobile-web-app-title', content: 'Qual a Boa' },
      ],
      link: [
        { rel: 'manifest', href: '/manifest.webmanifest' },
        { rel: 'apple-touch-icon', href: '/icon-192x192.png' },
        { rel: 'icon', type: 'image/png', sizes: '192x192', href: '/icon-192x192.png' },
        { rel: 'icon', type: 'image/png', sizes: '512x512', href: '/icon-512x512.png' },
      ]
    }
  },
  pwa: {
    registerType: 'autoUpdate',
    strategies: 'generateSW',
    workbox: {
      globPatterns: ['**/*.{js,css,html,png,svg,ico}'],
      cleanupOutdatedCaches: true,
      skipWaiting: true,
      clientsClaim: true,
    },
    devOptions: {
      enabled: true,
      type: 'module',
    },
    includeAssets: ['favicon.ico', 'icon.png', 'prato.png'],
    manifest: {
      name: 'Qual a Boa',
      short_name: 'Qual a Boa',
      description: 'Descubra o melhor do seu bairro!',
      background_color: '#EA1D2C',
      theme_color: '#EA1D2C',
      lang: 'pt-BR',
      display: 'standalone',
      start_url: '/',
      scope: '/',
      orientation: 'portrait',
      categories: ['food', 'lifestyle'],
      icons: [
        {
          src: '/icon-192x192.png',
          sizes: '192x192',
          type: 'image/png',
        },
        {
          src: '/icon-512x512.png',
          sizes: '512x512',
          type: 'image/png',
        },
      ],
    },
  },
  runtimeConfig: {
    public: {
      supabaseUrl: process.env.SUPABASE_URL,
      supabaseKey: process.env.SUPABASE_KEY,
    }
  },
})