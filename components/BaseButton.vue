<template>
  <button
    :class="[
      'px-4 py-4 rounded-2xl font-semibold transition-all duration-200 transform active:scale-95',
      'text-base',
      variant === 'primary' ? 'bg-primary text-primary-contrast hover:bg-primary-dark focus:ring-2 focus:ring-primary/50' : '',
      variant === 'secondary' ? 'bg-secondary text-primary hover:bg-secondary-dark focus:ring-2 focus:ring-secondary/50' : '',
      variant === 'outline' ? 'border border-gray-200 dark:border-gray-700 text-primary hover:bg-gray-50 dark:hover:bg-gray-800 focus:ring-2 focus:ring-primary/50' : '',
      disabled ? 'opacity-50 cursor-not-allowed transform-none' : ''
    ]"
    :disabled="disabled"
  >
    <slot />
  </button>
</template>

<script setup>
defineProps({
  variant: {
    type: String,
    default: 'primary',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
})
</script>
