<template>
  <div>
    <label v-if="label" class="block mb-1 text-sm font-medium text-text-light dark:text-text-dark">{{ label }}</label>
    <div class="relative">
      <input
        v-bind="$attrs"
        :class="[
          'w-full px-3 py-2 border rounded-md outline-none transition-all duration-200',
          'bg-background-light dark:bg-background-dark',
          'text-text-light dark:text-text-dark',
          'placeholder:text-text-muted text-sm',
          error ? 'border-primary shadow-sm shadow-primary/20' : 'border-border-light dark:border-border-dark',
          'focus:border-primary focus:shadow-sm focus:shadow-primary/20',
          'hover:border-primary/50',
          'text-base',
          'md:text-base'
        ]"
        style="font-size: 16px;"
      />
      <div v-if="error" class="absolute right-2 top-1/2 transform -translate-y-1/2">
        <svg class="w-4 h-4 text-primary" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
        </svg>
      </div>
    </div>
    <p v-if="error" class="text-xs text-primary mt-1 flex items-center">
      <svg class="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
        <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
      </svg>
      {{ error }}
    </p>
  </div>
</template>

<script setup>
defineProps({
  label: String,
  error: String,
})
</script>
