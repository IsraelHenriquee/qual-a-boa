<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4 overflow-hidden">
    <!-- Background decoration -->
    <div class="absolute inset-0 overflow-hidden">
      <!-- Elementos decorativos sutis e modernos -->
      <div class="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl dark:bg-primary/3"></div>
      <div class="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl dark:bg-accent/3"></div>
    </div>
    
    <div class="relative z-10">
      <LoginForm />
    </div>
  </div>
</template>

<script setup>
import LoginForm from '~/components/LoginForm.vue'
</script>
