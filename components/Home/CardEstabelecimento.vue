<template>
  <div class="bg-background-light dark:bg-background-dark rounded-xl shadow-sm overflow-hidden mb-3 mx-4">
    <!-- Imagem com altura maior -->
    <div class="relative h-40 overflow-hidden">
      <img
        v-if="estabelecimento.imagem_capa"
        :src="estabelecimento.imagem_capa"
        :alt="estabelecimento.nome"
        class="w-full h-full object-cover"
      />
      <div v-else class="w-full h-full bg-surface-light dark:bg-surface-dark flex items-center justify-center">
        <span class="text-text-muted text-sm">Sem imagem</span>
      </div>
      
      <!-- Status overlay -->
      <div class="absolute top-2 right-2">
        <span 
          :class="estabelecimento.is_open ? 'bg-success text-white' : 'bg-error text-white'" 
          class="px-2 py-1 rounded-md text-xs font-medium"
        >
          {{ estabelecimento.is_open ? 'ABERTO' : 'FECHADO' }}
        </span>
      </div>
      
      <!-- Categoria badge -->
      <div class="absolute top-2 left-2">
        <span class="bg-primary/90 text-white px-2 py-1 rounded-md text-xs font-medium">
          {{ estabelecimento.categoria }}
        </span>
      </div>
    </div>
    
    <!-- Conteúdo do card -->
    <div class="p-4">
      <!-- Nome do estabelecimento -->
      <h3 class="text-base font-semibold text-text-primary mb-2 line-clamp-1">
        {{ estabelecimento.nome }}
      </h3>
      
      <!-- Endereço -->
      <div class="flex items-center gap-2">
        <span class="text-text-muted text-sm">📍</span>
        <p class="text-sm text-text-secondary line-clamp-1 flex-1">
          {{ estabelecimento.endereco }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Estabelecimento } from '~/types/estabelecimento'

defineProps<{ estabelecimento: Estabelecimento }>()
</script>

<style scoped>
.line-clamp-1 {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
