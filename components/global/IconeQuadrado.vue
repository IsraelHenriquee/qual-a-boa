<template>
  <button
    :class="[
      'flex flex-col items-center justify-center min-w-[80px] p-3 rounded-2xl transition-colors',
      ativo 
        ? 'bg-primary/20 ring-2 ring-primary/30' 
        : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700'
    ]"
    :title="label"
    type="button"
    @click="$emit('click')"
  >
    <!-- Container do ícone -->
    <div :class="[
      'w-12 h-12 rounded-xl flex items-center justify-center mb-2 shadow-sm',
      ativo ? 'bg-primary/10' : 'bg-white dark:bg-gray-900'
    ]">
      <span class="text-primary text-xl">{{ icone || '🏪' }}</span>
    </div>
    <!-- Label -->
    <span v-if="label" class="text-xs font-medium text-gray-700 dark:text-gray-300 text-center leading-tight">
      {{ label }}
    </span>
  </button>
</template>

<script setup>
const props = defineProps({
  label: { type: String, default: '' },
  icone: { type: String, default: '' },
  ativo: { type: Boolean, default: false }
})

defineEmits(['click'])
</script>
