<template>
  <div class="h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 via-background-light to-accent/10 dark:from-background-dark dark:via-background-dark dark:to-background-dark p-4 overflow-hidden">
    <!-- Background decoration -->
    <div class="absolute inset-0 overflow-hidden">
      <div class="absolute -top-40 -right-40 w-80 h-80 bg-primary/20 rounded-full blur-3xl"></div>
      <div class="absolute -bottom-40 -left-40 w-80 h-80 bg-accent/20 rounded-full blur-3xl"></div>
    </div>
    
    <div class="relative z-10">
      <LoginForm />
    </div>
  </div>
</template>

<script setup>
import LoginForm from '~/components/LoginForm.vue'
</script>
