<template>
  <div class="flex flex-col items-center justify-center min-h-screen text-center bg-gradient-to-br from-primary/10 via-background-light to-accent/10 dark:from-background-dark dark:via-background-dark dark:to-background-dark p-4">
    <!-- Background decoration -->
    <div class="absolute inset-0 overflow-hidden">
      <div class="absolute -top-40 -right-40 w-80 h-80 bg-primary/20 rounded-full blur-3xl"></div>
      <div class="absolute -bottom-40 -left-40 w-80 h-80 bg-accent/20 rounded-full blur-3xl"></div>
    </div>
    
    <div class="relative z-10 max-w-md mx-auto">
      <h1 class="text-2xl font-bold text-primary mb-6">📱 Instalar Qual a Boa</h1>
      
      <div class="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg p-6 shadow-lg">
        <h2 class="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">Como instalar:</h2>
        
        <!-- iOS Safari -->
        <div class="mb-6 text-left">
          <h3 class="font-medium text-blue-600 mb-2">📱 iPhone/iPad (Safari):</h3>
          <ol class="text-sm text-gray-700 dark:text-gray-300 space-y-1">
            <li>1. Toque no botão <strong>Compartilhar</strong> (□↗)</li>
            <li>2. Role para baixo e toque <strong>"Adicionar à Tela de Início"</strong></li>
            <li>3. Toque em <strong>"Adicionar"</strong></li>
          </ol>
        </div>
        
        <!-- Android Chrome -->
        <div class="mb-6 text-left">
          <h3 class="font-medium text-green-600 mb-2">🤖 Android (Chrome):</h3>
          <ol class="text-sm text-gray-700 dark:text-gray-300 space-y-1">
            <li>1. Toque no menu <strong>(⋮)</strong></li>
            <li>2. Toque em <strong>"Adicionar à tela inicial"</strong></li>
            <li>3. Toque em <strong>"Adicionar"</strong></li>
          </ol>
        </div>
        
        <!-- Desktop -->
        <div class="mb-6 text-left">
          <h3 class="font-medium text-purple-600 mb-2">💻 Desktop (Chrome/Edge):</h3>
          <ol class="text-sm text-gray-700 dark:text-gray-300 space-y-1">
            <li>1. Clique no ícone <strong>⚙️</strong> na barra de endereços</li>
            <li>2. Ou use o menu e clique <strong>"Instalar app"</strong></li>
          </ol>
        </div>
        
        <div class="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-md">
          <p class="text-sm text-blue-800 dark:text-blue-200">
            � <strong>Dica:</strong> Depois de instalado, o app abrirá sem barra de endereços, como um app nativo!
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// Remove a página do layout padrão
definePageMeta({
  layout: false
})

// Configurações PWA no head
useHead({
  title: 'Instalar App - Qual a Boa',
  meta: [
    { name: 'description', content: 'Instruções para instalar o app Qual a Boa na sua tela inicial' },
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
})
</script>
