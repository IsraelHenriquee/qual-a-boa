<template>
  <div class="relative w-full">
    <div class="relative">
      <input
        v-model="searchValue"
        @input="handleInput"
        @focus="$emit('focus')"
        @blur="$emit('blur')"
        :placeholder="placeholder"
        class="w-full pl-12 pr-4 py-4 text-base bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-200 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white"
        style="font-size: 16px;"
      />
      <!-- Ícone de pesquisa -->
      <div class="absolute left-4 top-1/2 transform -translate-y-1/2">
        <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
      <!-- Botão limpar (quando há texto) -->
      <button
        v-if="searchValue"
        @click="clearSearch"
        class="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

interface Props {
  modelValue?: string
  placeholder?: string
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  placeholder: 'Procurar eventos, bares ou baladas...'
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
  'focus': []
  'blur': []
  'search': [value: string]
}>()

const searchValue = ref(props.modelValue)

// Sincroniza com o valor externo
watch(() => props.modelValue, (newValue) => {
  searchValue.value = newValue
})

// Emite mudanças para o componente pai
watch(searchValue, (newValue) => {
  emit('update:modelValue', newValue)
  emit('search', newValue)
})

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  searchValue.value = target.value
}

const clearSearch = () => {
  searchValue.value = ''
}
</script>
