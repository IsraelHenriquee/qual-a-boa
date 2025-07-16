<template>
  <!-- Página Home -->
  <div class="overflow-y-auto h-screen pb-20" style="scroll-behavior: smooth;" @scroll="onScroll" ref="scrollContainer">
    <!-- Header com título e localização -->
    <div class="p-4 pt-6">
      <div class="flex items-center justify-between mb-2">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
            <span class="text-white text-lg">🍺</span>
          </div>
          <h1 class="text-2xl font-bold text-gray-900 dark:text-white">Qual é a boa?</h1>
        </div>
        <div class="flex items-center gap-2 text-gray-600 dark:text-gray-300">
          <span class="text-sm">📍</span>
          <span class="text-sm font-medium">Curitiba</span>
        </div>
      </div>
      <div class="flex items-center justify-between">
        <p class="text-gray-600 dark:text-gray-400 text-sm">Descubra os melhores lugares</p>
        
        <!-- Switch de Abertos -->
        <div class="flex items-center gap-2">
          <span class="text-sm text-gray-600 dark:text-gray-400">Abertos</span>
          <Switch
            v-model="filtroAbertos"
            :class="filtroAbertos ? 'bg-green-500' : 'bg-gray-200 dark:bg-gray-700'"
            class="relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          >
            <span
              :class="filtroAbertos ? 'translate-x-5' : 'translate-x-0'"
              class="pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out"
            />
          </Switch>
        </div>
      </div>
      
      <!-- Input de pesquisa -->
      <BaseSearch 
        v-model="searchQuery"
        placeholder="Procurar eventos, bares ou baladas..."
        @search="handleSearch"
        class="mt-4"
      />
    </div>

    <!-- Categorias -->
    <div class="px-4">
      <ListaCategorias 
        :categoria-ativa="categoriaFiltro"
        @categoria-selecionada="filtrarPorCategoria"
      />
    </div>
    
    <!-- Lista de estabelecimentos -->
    <div class="mt-4 pb-8">
      <ListaEstabelecimentos :estabelecimentos="estabelecimentos" />
    </div>
    
    <!-- Botão Voltar ao Topo -->
    <Transition
      enter-active-class="transition-all duration-300 ease-out"
      leave-active-class="transition-all duration-200 ease-in"
      enter-from-class="opacity-0 translate-y-2 scale-95"
      enter-to-class="opacity-100 translate-y-0 scale-100"
      leave-from-class="opacity-100 translate-y-0 scale-100"
      leave-to-class="opacity-0 translate-y-2 scale-95"
    >
      <button
        v-if="showScrollToTop"
        @click="scrollToTop"
        class="fixed bottom-24 right-4 z-30 bg-primary text-white p-3 rounded-full shadow-lg hover:bg-primary/90 transition-colors duration-200"
        title="Voltar ao topo"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      </button>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { Switch } from '@headlessui/vue'
import ListaCategorias from '~/components/Home/ListaCategorias.vue'
import ListaEstabelecimentos from '~/components/Home/ListaEstabelecimentos.vue'
import BaseSearch from '~/components/BaseSearch.vue'
import { useEstabelecimentos } from '~/composables/useEstabelecimentos'
import type { Estabelecimento } from '~/types/estabelecimento'

const estabelecimentos = ref<Estabelecimento[]>([])
const estabelecimentosOriginais = ref<Estabelecimento[]>([])
const loading = ref(false)
const searchQuery = ref('')
const categoriaFiltro = ref<number | undefined>(undefined)
const filtroAbertos = ref(true)
const showScrollToTop = ref(false)
const scrollContainer = ref<HTMLElement>()
const { buscarEstabelecimentos } = useEstabelecimentos()

// Watcher para filtrar em tempo real conforme digita
watch(searchQuery, (newQuery) => {
  filtrarEstabelecimentos(newQuery)
})

// Watcher para filtrar quando muda o toggle de abertos
watch(filtroAbertos, () => {
  filtrarEstabelecimentos(searchQuery.value)
})

const filtrarEstabelecimentos = (query: string) => {
  let base = [...estabelecimentosOriginais.value]
  
  // Aplica filtro de abertos PRIMEIRO (já que é padrão)
  if (filtroAbertos.value) {
    base = base.filter(est => est.is_open === true)
  }
  
  // Aplica filtro de categoria se selecionado
  if (categoriaFiltro.value) {
    base = base.filter(est => est.categoria_id === categoriaFiltro.value)
  }
  
  // Aplica filtro de busca textual se houver
  if (query.trim()) {
    const queryLower = query.trim().toLowerCase()
    base = base.filter(est => 
      est.nome.toLowerCase().includes(queryLower) ||
      (est.descricao && est.descricao.toLowerCase().includes(queryLower)) ||
      (est.bairro && est.bairro.toLowerCase().includes(queryLower))
    )
  }
  
  estabelecimentos.value = base
}

const handleSearch = async (query: string) => {
  // A busca agora é feita pelo watcher, esta função só é chamada quando há mudanças
  filtrarEstabelecimentos(query)
}

const filtrarPorCategoria = async (categoriaId: number) => {
  // Toggle: se já está selecionada, desmarca. Senão, marca.
  if (categoriaFiltro.value === categoriaId) {
    categoriaFiltro.value = undefined
  } else {
    categoriaFiltro.value = categoriaId
  }
  filtrarEstabelecimentos(searchQuery.value)
}

const onScroll = (event: Event) => {
  const target = event.target as HTMLElement
  const scrollTop = target.scrollTop
  
  // Mostra o botão "voltar ao topo" quando rolar mais de 200px
  showScrollToTop.value = scrollTop > 200
}

const scrollToTop = () => {
  if (scrollContainer.value) {
    scrollContainer.value.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }
}

onMounted(async () => {
  loading.value = true
  try {
    const resp = await buscarEstabelecimentos()
    if (resp.success) {
      estabelecimentosOriginais.value = resp.data
      // Aplica filtro padrão (abertos) na inicialização
      filtrarEstabelecimentos(searchQuery.value)
    }
  } finally {
    loading.value = false
  }
})
</script>
