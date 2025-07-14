<template>
  <div class="bg-white dark:bg-gray-900 rounded-2xl shadow-md overflow-hidden mb-4 border border-gray-100 dark:border-gray-800 transition-all duration-200 hover:shadow-lg">
    
    <!-- Imagem limpa sem overlays -->
    <div class="relative h-48 overflow-hidden">
      <img
        v-if="estabelecimento.imagem_capa"
        :src="estabelecimento.imagem_capa"
        :alt="estabelecimento.nome"
        class="w-full h-full object-cover"
      />
      <div v-else class="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 flex items-center justify-center">
        <div class="text-center">
          <div class="text-3xl mb-2">🏪</div>
          <span class="text-gray-500 dark:text-gray-400 text-sm">Sem imagem</span>
        </div>
      </div>
      
      <!-- Apenas status badge no canto -->
      <div class="absolute top-3 right-3">
        <div 
          :class="estabelecimento.is_open ? 'bg-green-500' : 'bg-red-500'"
          class="px-3 py-1 rounded-full shadow-lg"
        >
          <span class="text-white font-bold text-xs">
            {{ estabelecimento.is_open ? 'ABERTO' : 'FECHADO' }}
          </span>
        </div>
      </div>
    </div>
    
    <!-- Conteúdo principal -->
    <div class="p-4 space-y-3">
      
      <!-- Nome do estabelecimento -->
      <div class="flex items-start justify-between">
        <h3 class="text-lg font-bold text-gray-900 dark:text-white leading-tight flex-1">
          {{ estabelecimento.nome }}
        </h3>
        <!-- Categoria no canto direito -->
        <span class="bg-primary/10 text-primary px-2 py-1 rounded-md text-xs font-medium ml-2 flex-shrink-0">
          {{ estabelecimento.categoria }}
        </span>
      </div>
      
      <!-- Descrição -->
      <p v-if="estabelecimento.descricao" class="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
        {{ truncarTexto(estabelecimento.descricao, 100) }}
      </p>
      
      <!-- Bairro e Horário em container -->
      <div class="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-100 dark:border-gray-700">
        <!-- Bairro -->
        <div class="flex items-center gap-2">
          <span class="text-primary text-sm">📍</span>
          <span class="text-gray-700 dark:text-gray-300 text-sm font-medium">
            {{ estabelecimento.bairro }}
          </span>
        </div>
        
        <!-- Horário -->
        <div v-if="estabelecimento.horario_abertura && estabelecimento.horario_fechamento" class="flex items-center gap-2">
          <span class="text-primary text-sm">🕐</span>
          <span class="text-gray-700 dark:text-gray-300 text-sm font-medium">
            {{ formatarHorario(estabelecimento.horario_abertura) }} - {{ formatarHorario(estabelecimento.horario_fechamento) }}
          </span>
        </div>
      </div>
      
      <!-- Subcategorias -->
      <div v-if="estabelecimento.subcategorias && estabelecimento.subcategorias.length > 0" class="flex flex-wrap gap-2 pt-2">
        <span 
          v-for="(sub, index) in estabelecimento.subcategorias.slice(0, 3)" 
          :key="sub.id"
          class="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-3 py-1 rounded-full text-xs font-medium"
        >
          {{ sub.subcategoria }}
        </span>
        <span 
          v-if="estabelecimento.subcategorias.length > 3"
          class="bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 px-3 py-1 rounded-full text-xs"
        >
          +{{ estabelecimento.subcategorias.length - 3 }} mais
        </span>
      </div>
      
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Estabelecimento } from '~/types/estabelecimento'

defineProps<{ estabelecimento: Estabelecimento }>()

const truncarTexto = (texto: string, limite: number): string => {
  if (texto.length <= limite) return texto
  return texto.substring(0, limite).trim() + '...'
}

const formatarHorario = (horario: string): string => {
  return horario.substring(0, 5)
}
</script>
