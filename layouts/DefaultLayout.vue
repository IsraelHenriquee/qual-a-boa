<template>
  <div class="min-h-screen flex flex-col bg-background-light dark:bg-background-dark pt-14 pb-14">
    <AppBar />
    <main class="flex-1 w-full max-w-2xl mx-auto px-4 py-4">
      <slot />
    </main>
    <Navbar />
  </div>
</template>

<script setup>
import AppBar from '~/components/global/AppBar.vue'
import Navbar from '~/components/global/Navbar.vue'
</script>
