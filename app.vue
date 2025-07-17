<template>
  <div class="content-container">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup>
import { useTheme } from '~/composables/useTheme'

// Inicializa o sistema de tema globalmente
const { updateStatusBarColor } = useTheme()

// Desativa o efeito de bounce em dispositivos iOS/macOS
</script>

<style>
/* Estilos básicos movidos para assets/css/main.css e no-bounce.css */
#__nuxt {
  height: 100%;
  width: 100%;
}

/* Ajustes específicos para o app */
.content-container {
  height: 100%;
  width: 100%;
  -webkit-overflow-scrolling: touch;
  /* Para rolagem suave no iOS */
}
</style>
