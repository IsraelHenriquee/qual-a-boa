<template>
  <DefaultLayout>
    <div class="p-6 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-8">Perfil</h1>
      
      <!-- Seção de Tema -->
      <div class="bg-white dark:bg-gray-800 rounded-2xl p-6 mb-6 shadow-lg border border-gray-100 dark:border-gray-700 transition-all duration-300">
        <h2 class="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
          <span class="text-2xl">🎨</span>
          Aparência
        </h2>
        
        <!-- Opção de tema do sistema -->
        <div class="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl mb-4">
          <div class="flex items-center gap-3">
            <span class="text-2xl">🖥️</span>
            <div>
              <span class="text-gray-900 dark:text-white font-medium">Usar tema do sistema</span>
              <p class="text-sm text-gray-500 dark:text-gray-400">
                Adapta-se automaticamente às preferências do seu dispositivo
              </p>
            </div>
          </div>
          <button
            @click="useSystemTheme"
            :class="isSystemTheme ? 'bg-primary shadow-lg shadow-primary/25' : 'bg-gray-300'"
            class="relative inline-flex h-8 w-14 items-center rounded-full transition-all duration-300 transform hover:scale-105"
          >
            <span
              :class="isSystemTheme ? 'translate-x-7 bg-white' : 'translate-x-1 bg-white'"
              class="inline-block h-6 w-6 transform rounded-full transition-transform duration-300 shadow-lg"
            />
          </button>
        </div>
        
        <!-- Opção de tema manual (desativado se estiver usando tema do sistema) -->
        <div class="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl" :class="isSystemTheme ? 'opacity-50' : ''">
          <div class="flex items-center gap-3">
            <span class="text-2xl">{{ isDarkMode ? '🌙' : '☀️' }}</span>
            <div>
              <span class="text-gray-900 dark:text-white font-medium">Tema escuro</span>
              <p class="text-sm text-gray-500 dark:text-gray-400">
                {{ isDarkMode ? 'Modo escuro ativado' : 'Modo claro ativado' }}
              </p>
            </div>
          </div>
          <button
            @click="toggleTheme"
            :disabled="isSystemTheme"
            :class="[
              isDarkMode && !isSystemTheme ? 'bg-primary shadow-lg shadow-primary/25' : 'bg-gray-300',
              isSystemTheme ? 'cursor-not-allowed' : 'cursor-pointer'
            ]"
            class="relative inline-flex h-8 w-14 items-center rounded-full transition-all duration-300 transform hover:scale-105"
          >
            <span
              :class="isDarkMode && !isSystemTheme ? 'translate-x-7 bg-white' : 'translate-x-1 bg-white'"
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
import { useTheme } from '~/composables/useTheme'

const { logout } = useSupabaseAuth()
const { isDarkMode, isSystemTheme, toggleTheme, useSystemTheme } = useTheme()
</script>
