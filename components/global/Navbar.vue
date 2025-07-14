<template>
  <nav class="w-full flex justify-around items-center bg-primary text-primary-contrast border-t border-border-light dark:border-border-dark py-2 pb-8 fixed bottom-0 left-0 z-20">
    <NuxtLink to="/" class="flex flex-col items-center focus:outline-none" :class="$route.path === '/' ? 'text-primary-contrast' : 'text-primary-contrast/60'">
      <svg class="w-6 h-6 mb-1" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" d="M3 12l9-9 9 9M4 10v10a1 1 0 001 1h3m10-11v10a1 1 0 01-1 1h-3m-6 0h6" />
      </svg>
      <span class="text-xs">Home</span>
    </NuxtLink>
    <NuxtLink to="/historico" class="flex flex-col items-center focus:outline-none" :class="$route.path === '/historico' ? 'text-primary-contrast' : 'text-primary-contrast/60'">
      <svg class="w-6 h-6 mb-1" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" d="M8 17l4 4 4-4m0-5V3m-8 9v6a2 2 0 002 2h4a2 2 0 002-2v-6" />
      </svg>
      <span class="text-xs">Histórico</span>
    </NuxtLink>
    <NuxtLink to="/perfil" class="flex flex-col items-center focus:outline-none" :class="$route.path === '/perfil' ? 'text-primary-contrast' : 'text-primary-contrast/60'">
      <svg class="w-6 h-6 mb-1" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" d="M5.121 17.804A13.937 13.937 0 0112 15c2.5 0 4.847.655 6.879 1.804M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
      <span class="text-xs">Perfil</span>
    </NuxtLink>
  </nav>
</template>

<script setup>
import { useRoute } from 'vue-router'
const $route = useRoute()
</script>
