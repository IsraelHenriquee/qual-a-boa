<template>
  <div class="flex mb-6 bg-background-muted rounded-lg p-1" style="width: 100%; min-width: 320px;">
    <button
      v-for="tab in tabs"
      :key="tab.id"
      class="flex-1 py-2 font-semibold text-sm transition-all duration-200 rounded-md"
      :class="activeTab === tab.id ? 'bg-primary text-primary-contrast shadow-md' : 'text-text-muted hover:text-text-light'"
      @click="$emit('change', tab.id)"
      type="button"
      style="min-width: 160px;"
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
