<template>
  <DefaultLayout>
    <div class="p-6 min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-8">Perfil</h1>
      
      <!-- Seção de Tema -->
      <div class="bg-white dark:bg-gray-800 rounded-2xl p-6 mb-6 shadow-lg border border-gray-100 dark:border-gray-700 transition-all duration-300">
        <h2 class="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
          <span class="text-2xl">🎨</span>
          Aparência
        </h2>
        <div class="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
          <div class="flex items-center gap-3">
            <span class="text-2xl">{{ isDark ? '🌙' : '☀️' }}</span>
            <div>
              <span class="text-gray-900 dark:text-white font-medium">Tema escuro</span>
              <p class="text-sm text-gray-500 dark:text-gray-400">
                {{ isDark ? 'Modo escuro ativado' : 'Modo claro ativado' }}
              </p>
            </div>
          </div>
          <button
            @click="toggleTheme"
            :class="isDark ? 'bg-primary shadow-lg shadow-primary/25' : 'bg-gray-300'"
            class="relative inline-flex h-8 w-14 items-center rounded-full transition-all duration-300 transform hover:scale-105"
          >
            <span
              :class="isDark ? 'translate-x-7 bg-white' : 'translate-x-1 bg-white'"
              class="inline-block h-6 w-6 transform rounded-full transition-transform duration-300 shadow-lg"
            />
          </button>
        </div>
      </div>

      <!-- Seção de Conta -->
      <div class="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700 transition-all duration-300">
        <h2 class="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
          <span class="text-2xl">👤</span>
          Conta
        </h2>
        <div class="space-y-4">
          <div class="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
            <p class="text-sm text-gray-600 dark:text-gray-300 mb-2">
              Você está logado como usuário anônimo
            </p>
            <p class="text-xs text-gray-500 dark:text-gray-400">
              Para salvar suas preferências, considere criar uma conta
            </p>
          </div>
          <button 
            @click="logout" 
            class="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center gap-3"
          >
            <span class="text-xl">🚪</span>
            Sair da conta
          </button>
        </div>
      </div>
    </div>
  </DefaultLayout>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import DefaultLayout from '~/layouts/DefaultLayout.vue'
import { useSupabaseAuth } from '~/composables/useSupabaseAuth'

const { logout } = useSupabaseAuth()
const isDark = ref(false)

const toggleTheme = () => {
  isDark.value = !isDark.value
  
  if (isDark.value) {
    document.documentElement.classList.add('dark')
    localStorage.setItem('theme', 'dark')
  } else {
    document.documentElement.classList.remove('dark')
    localStorage.setItem('theme', 'light')
  }
}

onMounted(() => {
  // Verifica o tema salvo no localStorage
  const savedTheme = localStorage.getItem('theme')
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  
  isDark.value = savedTheme === 'dark' || (!savedTheme && prefersDark)
  
  if (isDark.value) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
})
</script>
