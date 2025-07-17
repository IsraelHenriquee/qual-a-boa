<template>
  <div class="flex mb-6 bg-gray-100 dark:bg-gray-800 rounded-lg p-1" style="width: 100%;">
    <button
      v-for="tab in tabs"
      :key="tab.id"
      class="flex-1 py-2 font-semibold text-sm transition-all duration-200 rounded-md"
      :class="activeTab === tab.id ? 'bg-primary text-primary-contrast shadow-md' : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'"
      @click="$emit('change', tab.id)"
      type="button"
    >
      {{ tab.label }}
    </button>
  </div>
</template>

<script setup>
defineProps({
  tabs: {
    type: Array,
    required: true,
  },
  activeTab: {
    type: String,
    required: true,
  },
})

defineEmits(['change'])
</script>
