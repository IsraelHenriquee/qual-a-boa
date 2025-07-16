<template>
  <div
    class="relative bg-gradient-to-br from-white via-white to-secondary-light/30 dark:from-surface-dark dark:via-surface-dark dark:to-primary-dark/10 rounded-3xl shadow-lg border border-secondary-light/50 dark:border-gray-700/50 overflow-hidden mb-6 backdrop-blur-sm">

    <!-- Header com gradiente -->
    <div class="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-primary-soft to-accent"></div>

    <!-- Seção de imagem com overlay criativo -->
    <div class="relative h-48 overflow-hidden">
      <!-- Imagem -->
      <div v-if="estabelecimento.imagem_capa" class="relative w-full h-full">
        <img :src="estabelecimento.imagem_capa" :alt="estabelecimento.nome" class="w-full h-full object-cover"
          loading="lazy" />
        <!-- Overlay com gradiente diagonal -->
        <div class="absolute inset-0 bg-gradient-to-tr from-black/40 via-transparent to-primary/20"></div>
        <!-- Padrão decorativo no canto -->
        <div class="absolute top-4 left-4 w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm"></div>
        <div class="absolute top-6 left-6 w-4 h-4 rounded-full bg-primary/30"></div>
      </div>

      <!-- Placeholder criativo -->
      <div v-else
        class="w-full h-full bg-gradient-to-br from-secondary-light via-primary/5 to-accent/10 dark:from-gray-800 dark:via-primary-dark/20 dark:to-gray-700 flex items-center justify-center relative overflow-hidden">
        <!-- Padrões de fundo -->
        <div class="absolute inset-0">
          <div class="absolute top-8 left-8 w-16 h-16 rounded-full bg-primary/10 blur-xl"></div>
          <div class="absolute bottom-8 right-8 w-20 h-20 rounded-full bg-accent/10 blur-xl"></div>
          <div
            class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full bg-gradient-to-r from-primary/5 to-accent/5 blur-2xl">
          </div>
        </div>

        <!-- Ícone central -->
        <div class="text-center z-10">
          <div
            class="w-20 h-20 mx-auto mb-3 rounded-2xl bg-gradient-to-br from-primary/20 via-primary/10 to-accent/20 flex items-center justify-center shadow-xl border border-white/20">
            <svg class="w-10 h-10 text-primary/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
          <span class="text-gray-500 dark:text-gray-400 text-sm font-medium">Sem imagem disponível</span>
        </div>
      </div>

      <!-- Status badge moderno -->
      <div class="absolute top-4 right-4">
        <div :class="estabelecimento.is_open ? 'bg-success shadow-success/25' : 'bg-error shadow-error/25'"
          class="px-3 py-1.5 rounded-xl text-white text-xs font-bold shadow-lg backdrop-blur-sm border border-white/20">
          <div class="flex items-center gap-1.5">
            <div :class="estabelecimento.is_open ? 'bg-white' : 'bg-white'"
              class="w-1.5 h-1.5 rounded-full animate-pulse"></div>
            {{ estabelecimento.is_open ? 'ABERTO' : 'FECHADO' }}
          </div>
        </div>
      </div>

      <!-- Categoria flutuante -->
      <div class="absolute bottom-4 left-4">
        <span
          class="bg-white/90 dark:bg-gray-900/90 text-primary px-3 py-1.5 rounded-xl text-xs font-bold shadow-lg backdrop-blur-sm border border-primary/20">
          {{ estabelecimento.categoria }}
        </span>
      </div>
    </div>

    <!-- Conteúdo principal -->
    <div class="p-5 space-y-4">

      <!-- Nome do estabelecimento -->
      <div class="space-y-2">
        <h3 class="text-xl font-bold text-gray-900 dark:text-white leading-tight">
          {{ estabelecimento.nome }}
        </h3>

        <!-- Descrição -->
        <p v-if="estabelecimento.descricao" class="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
          {{ truncarTexto(estabelecimento.descricao, 120) }}
        </p>
      </div>

      <!-- Card de informações -->
      <div
        class="bg-gradient-to-r from-background-muted/50 to-secondary-light/20 dark:from-gray-800/50 dark:to-primary-dark/10 rounded-2xl p-4 border border-secondary-light/30 dark:border-gray-700/30">
        <div class="space-y-3">
          <!-- Localização -->
          <div class="flex items-center gap-3">
            <div class="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center">
              <svg class="w-4 h-4 text-primary" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd"
                  d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                  clip-rule="evenodd" />
              </svg>
            </div>
            <div>
              <span class="text-gray-500 dark:text-gray-400 text-xs font-medium">Localização</span>
              <p class="text-gray-900 dark:text-white text-sm font-semibold">{{ estabelecimento.bairro }}</p>
            </div>
          </div>

          <!-- Horário -->
          <div v-if="estabelecimento.horario_abertura && estabelecimento.horario_fechamento"
            class="flex items-center gap-3">
            <div class="w-8 h-8 rounded-xl bg-accent/10 flex items-center justify-center">
              <svg class="w-4 h-4 text-accent-dark" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                  clip-rule="evenodd" />
              </svg>
            </div>
            <div>
              <span class="text-gray-500 dark:text-gray-400 text-xs font-medium">Funcionamento</span>
              <p class="text-gray-900 dark:text-white text-sm font-semibold">
                {{ formatarHorario(estabelecimento.horario_abertura) }} - {{
                  formatarHorario(estabelecimento.horario_fechamento) }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Subcategorias -->
      <div v-if="estabelecimento.subcategorias && estabelecimento.subcategorias.length > 0" class="space-y-2">
        <span class="text-gray-500 dark:text-gray-400 text-xs font-medium">Especialidades</span>
        <div class="flex flex-wrap gap-2">
          <span v-for="sub in estabelecimento.subcategorias.slice(0, 4)" :key="sub.id"
            class="bg-gradient-to-r from-primary/10 to-accent/10 text-primary-dark dark:text-primary-soft px-3 py-1.5 rounded-xl text-xs font-medium border border-primary/20">
            {{ sub.subcategoria }}
          </span>
          <span v-if="estabelecimento.subcategorias.length > 4"
            class="bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 px-3 py-1.5 rounded-xl text-xs font-medium border border-gray-200 dark:border-gray-700">
            +{{ estabelecimento.subcategorias.length - 4 }} mais
          </span>
        </div>
      </div>

    </div>

    <!-- Decoração inferior -->
    <div class="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent">
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
