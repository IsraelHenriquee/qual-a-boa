<template>
  <div 
    class="min-h-screen flex flex-col bg-background-light dark:bg-background-dark"
    :style="nativePadding"
  >
    <main class="flex-1 w-full max-w-2xl mx-auto pb-20">
      <slot />
    </main>
    <Navbar />
  </div>
</template>

<script setup>
import Navbar from '~/components/global/Navbar.vue'
import { Capacitor } from '@capacitor/core'
import { ref, onMounted, computed } from 'vue'

const isNativePlatform = ref(false)

onMounted(() => {
  // Detecta se está rodando no app nativo
  isNativePlatform.value = Capacitor.isNativePlatform()
})

const nativePadding = computed(() => {
  if (isNativePlatform.value) {
    return {
      paddingTop: '60px' // Altura padrão da status bar + notch
    }
  }
  return {}
})
</script>
