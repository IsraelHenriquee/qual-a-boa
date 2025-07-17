<template>
  <div class="min-h-screen bg-background-light dark:bg-background-dark p-8">
    <div class="max-w-md mx-auto space-y-6">
      <h1 class="text-2xl font-bold text-gray-900 dark:text-white mb-8">Teste BaseInput</h1>
      
      <!-- Input de senha -->
      <BaseInput 
        v-model="senha"
        label="Senha" 
        placeholder="Digite sua senha" 
        icon="password"
      />
      
      <!-- Input de pesquisa -->
      <BaseInput 
        v-model="pesquisa"
        placeholder="Pesquisar..."
        icon="search"
        :clearable="true"
        @clear="pesquisa = ''"
      />
      
      <!-- Input de email -->
      <BaseInput 
        v-model="email"
        label="E-mail" 
        placeholder="Digite seu e-mail" 
        icon="email"
      />
      
      <!-- Input com erro -->
      <BaseInput 
        v-model="campoErro"
        label="Campo com erro" 
        placeholder="Digite algo" 
        icon="user"
        error="Este campo é obrigatório"
      />
      
      <!-- Valores para debug -->
      <div class="mt-8 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
        <h3 class="font-bold mb-2 text-gray-900 dark:text-white">Valores:</h3>
        <p class="text-sm text-gray-700 dark:text-gray-300">Senha: {{ senha }}</p>
        <p class="text-sm text-gray-700 dark:text-gray-300">Pesquisa: {{ pesquisa }}</p>
        <p class="text-sm text-gray-700 dark:text-gray-300">Email: {{ email }}</p>
        <p class="text-sm text-gray-700 dark:text-gray-300">Campo Erro: {{ campoErro }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const senha = ref('')
const pesquisa = ref('')
const email = ref('')
const campoErro = ref('')
</script>