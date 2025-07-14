<template>
  <div class="flex gap-3 overflow-x-auto py-2 px-1 scrollbar-hide justify-center">
    <IconeQuadrado
      v-for="cat in categorias"
      :key="cat.id"
      :label="cat.categoria"
      :icone="cat.icone"
    />
  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { useCategoriasStore } from '~/stores/categorias'
import IconeQuadrado from '~/components/global/IconeQuadrado.vue'
import { useEstabelecimentos } from '~/composables/useEstabelecimentos'
import { onMounted } from 'vue'

const categoriasStore = useCategoriasStore()
const { categorias } = storeToRefs(categoriasStore)
const { categorias: categoriasComposables, buscarCategorias } = useEstabelecimentos()

onMounted(async () => {
  if (!categorias.value.length) {
    await buscarCategorias()
    categoriasStore.setCategorias(categoriasComposables.value)
  }
})
</script>

<style scoped>
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
