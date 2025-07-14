import { defineStore } from 'pinia'
import type { Categoria } from '~/types/estabelecimento'

export const useCategoriasStore = defineStore('categorias', {
  state: () => ({
    categorias: [] as Categoria[],
  }),
  actions: {
    setCategorias(categorias: Categoria[]) {
      this.categorias = categorias
    },
    clearCategorias() {
      this.categorias = []
    }
  },
})
