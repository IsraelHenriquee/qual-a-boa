<template>
  <div>
    <label v-if="label" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{{ label }}</label>
    <div class="relative">
      <!-- Ícone à esquerda (se fornecido) -->
      <div v-if="icon" class="absolute left-4 top-1/2 transform -translate-y-1/2 flex items-center justify-center">
        <!-- Ícone de pesquisa -->
        <svg v-if="icon === 'search'" class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor"
          viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <!-- Ícone de email -->
        <svg v-else-if="icon === 'email'" class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor"
          viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
        </svg>
        <!-- Ícone de senha -->
        <svg v-else-if="icon === 'password'" class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor"
          viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
        <!-- Ícone de usuário -->
        <svg v-else-if="icon === 'user'" class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor"
          viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      </div>

      <input :value="modelValue" @input="$emit('update:modelValue', $event.target.value)" @focus="$emit('focus')"
        @blur="$emit('blur')" v-bind="$attrs" :type="currentInputType" :class="[
          'w-full py-4 text-base outline-none transition-all duration-200',
          'bg-gray-100 dark:bg-gray-800',
          'text-gray-900 dark:text-white',
          'placeholder-gray-500 dark:placeholder-gray-400',
          'rounded-2xl',
          'focus:ring-2 focus:ring-primary/50 focus:border-primary',
          'hover:bg-gray-50 dark:hover:bg-gray-700',
          icon ? 'pl-12' : 'pl-4',
          getRightPadding(),
          error ? 'border-2 border-primary bg-red-50 dark:bg-red-900/20' : 'border border-gray-200 dark:border-gray-700'
        ]" style="font-size: 16px;" />

      <!-- Botão de visualizar senha (para inputs de senha) -->
      <button v-if="isPasswordType && !error && !(clearable && modelValue)" @click="togglePasswordVisibility"
        type="button"
        class="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors flex items-center justify-center"
        :aria-label="showPassword ? 'Ocultar senha' : 'Mostrar senha'">
        <!-- Ícone de olho aberto (mostrar senha) -->
        <svg v-if="!showPassword" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
        <!-- Ícone de olho fechado (ocultar senha) -->
        <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
        </svg>
      </button>

      <!-- Ícone de erro -->
      <div v-if="error" class="absolute right-4 top-1/2 transform -translate-y-1/2 flex items-center justify-center">
        <svg class="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd"
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
            clip-rule="evenodd" />
        </svg>
      </div>

      <!-- Botão limpar (se clearable e há valor) -->
      <button v-if="clearable && modelValue && !error" @click="$emit('clear')" type="button"
        class="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors flex items-center justify-center"
        aria-label="Limpar campo">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>

    <!-- Mensagem de erro -->
    <p v-if="error" class="text-sm text-primary mt-2 flex items-center">
      <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
        <path fill-rule="evenodd"
          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
          clip-rule="evenodd" />
      </svg>
      {{ error }}
    </p>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  label: String,
  error: String,
  modelValue: [String, Number],
  icon: [String, Object], // Para ícones (componente ou string)
  clearable: {
    type: Boolean,
    default: false
  }
})

defineEmits(['update:modelValue', 'focus', 'blur', 'clear'])

// Estado para controlar visibilidade da senha
const showPassword = ref(false)

// Computed para verificar se é um input de senha
const isPasswordType = computed(() => {
  // Verifica se o type é password através dos attrs ou se o ícone é password
  return props.icon === 'password'
})

// Computed para o tipo atual do input
const currentInputType = computed(() => {
  if (isPasswordType.value) {
    return showPassword.value ? 'text' : 'password'
  }
  // Retorna o type padrão dos attrs ou 'text' como fallback
  return 'text'
})

// Função para alternar visibilidade da senha
const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value
}

// Função para calcular o padding direito baseado nos elementos à direita
const getRightPadding = () => {
  // Se tem erro, sempre pr-12 para dar espaço ao ícone de erro
  if (props.error) return 'pr-12'

  // Se é senha e não tem clearable, pr-12 para o botão de visualizar
  if (isPasswordType.value && !props.clearable) return 'pr-12'

  // Se é clearable e tem valor, pr-12 para o botão de limpar
  if (props.clearable && props.modelValue) return 'pr-12'

  // Caso padrão
  return 'pr-4'
}
</script>
