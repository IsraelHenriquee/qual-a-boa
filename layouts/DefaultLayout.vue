<template>
  <div class="min-h-screen flex flex-col bg-background-light dark:bg-background-dark pb-14">
    <main class="flex-1 w-full max-w-2xl mx-auto">
      <slot />
    </main>
    <Navbar />
  </div>
</template>

<script setup>
import Navbar from '~/components/global/Navbar.vue'
</script>
