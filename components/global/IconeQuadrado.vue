<template>
  <button
    class="flex flex-col items-center justify-center w-20 h-20 rounded-2xl bg-background-light dark:bg-background-dark shadow hover:bg-primary/10 transition-colors"
    :title="label"
    type="button"
  >
    <span class="text-2xl">
      <!-- Ícone removido -->
    </span>
    <span v-if="label" class="text-sm mt-2 text-center text-text-muted truncate w-full">{{ label }}</span>
  </button>
</template>

<script setup>
const props = defineProps({
  label: { type: String, default: '' },
  icone: { type: String, default: '' }
})
</script>
