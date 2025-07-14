<template>
  <button
    :class="[
      'px-4 py-2 rounded-md font-semibold transition-all duration-200 transform active:scale-95',
      'shadow-md hover:shadow-lg',
      variant === 'primary' ? 'bg-primary text-primary-contrast hover:bg-primary-dark shadow-primary/30' : '',
      variant === 'secondary' ? 'bg-secondary text-primary hover:bg-secondary-dark shadow-secondary/30' : '',
      variant === 'outline' ? 'border border-primary text-primary hover:bg-primary hover:text-primary-contrast' : '',
      disabled ? 'opacity-50 cursor-not-allowed transform-none shadow-none' : ''
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
