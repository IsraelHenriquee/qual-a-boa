<template>
  <!-- Página Home em branco -->
  <div class="overflow-y-auto h-screen pb-20" @scroll="onScroll" ref="scrollContainer">
    <ListaCategorias />
    <div class="mt-6 pb-8">
      <ListaEstabelecimentos :estabelecimentos="estabelecimentos" />
      <div v-if="isLoadingMore" class="flex justify-center py-4">
        <span class="text-text-muted">Carregando mais...</span>
      </div>
      <div v-else-if="!hasMoreData && estabelecimentos.length > 0" class="flex justify-center py-4">
        <span class="text-text-muted">Não há mais estabelecimentos</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import ListaCategorias from '~/components/Home/ListaCategorias.vue'
import ListaEstabelecimentos from '~/components/Home/ListaEstabelecimentos.vue'
import { useEstabelecimentos } from '~/composables/useEstabelecimentos'
import type { Estabelecimento } from '~/types/estabelecimento'

const estabelecimentos = ref<Estabelecimento[]>([])
const loading = ref(false)
const currentPage = ref(1)
const hasMoreData = ref(true)
const isLoadingMore = ref(false)
const scrollContainer = ref<HTMLElement>()
const { buscarEstabelecimentos } = useEstabelecimentos()

const carregarMais = async () => {
  if (loading.value || isLoadingMore.value || !hasMoreData.value) return
  
  isLoadingMore.value = true
  currentPage.value++
  
  try {
    const resp = await buscarEstabelecimentos(undefined, undefined, currentPage.value)
    if (resp.success && resp.data.length > 0) {
      estabelecimentos.value = [...estabelecimentos.value, ...resp.data]
      // Se trouxe menos de 20 items, não tem mais dados
      if (resp.data.length < 20) {
        hasMoreData.value = false
      }
    } else {
      hasMoreData.value = false
    }
  } catch (error) {
    console.error('Erro ao carregar mais estabelecimentos:', error)
    hasMoreData.value = false
  } finally {
    isLoadingMore.value = false
  }
}

let scrollTimeout: NodeJS.Timeout | null = null

const onScroll = (event: Event) => {
  if (scrollTimeout) {
    clearTimeout(scrollTimeout)
  }
  
  scrollTimeout = setTimeout(() => {
    const target = event.target as HTMLElement
    const scrollTop = target.scrollTop
    const scrollHeight = target.scrollHeight
    const clientHeight = target.clientHeight
    
    // Carrega mais quando está próximo do final (200px antes do fim)
    if (scrollTop + clientHeight >= scrollHeight - 200 && hasMoreData.value && !isLoadingMore.value) {
      carregarMais()
    }
  }, 100) // Debounce de 100ms
}

onMounted(async () => {
  loading.value = true
  try {
    const resp = await buscarEstabelecimentos()
    if (resp.success) {
      estabelecimentos.value = resp.data
      // Se trouxe menos de 20 items, não tem mais dados
      if (resp.data.length < 20) {
        hasMoreData.value = false
      }
    }
  } finally {
    loading.value = false
  }
})
</script>
